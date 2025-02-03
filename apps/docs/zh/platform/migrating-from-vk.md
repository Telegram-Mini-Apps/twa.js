# 将小程序从 VK 迁移到 Telegram

## 1. 入门

### 在 Telegram 中创建机器人

要开始在 Telegram 中使用 MiniApps，您需要创建一个机器人。  请按照以下步骤操作：

1. 打开 Telegram 应用程序并找到 BotFather。
2. 开始与 BotFather 对话，并使用 `/start`命令开始创建机器人。
3. 输入 `/newbot`命令，并按照说明创建新机器人。 您需要为机器人选择一个名称和唯一的用户名。 验证签名参数后，就可以从签名参数中提取用户数据。 例如 `vkUserId`。
4. 成功创建机器人后，BotFather 将为您提供一个访问令牌，这是与 Telegram API 交互所必需的。

### 注册和设置 MiniApp

要注册和设置 MiniApp，请按以下步骤操作：

1. 请访问 Telegram 官方文档中的[创建 Telegram Web App](https://core.telegram.org/bots/webapps)部分。
2. 按照说明注册 MiniApp、设置必要参数并将其与机器人集成。

## 2) 与平台应用程序接口互动

专用库用于与平台应用程序接口交互，方便用户访问这些平台的功能和特性。 VKontakte 和 Telegram 提供了此类库，分别是 `vk-bridge` 和 `@tma.js/sdk`。  这两个库的功能相似，都允许开发人员与其平台的应用程序接口交互，以获取用户数据并执行其他任务。

### VKontakte: vk-bridge

`vk-bridge` 库旨在与 VKontakte API 交互。  官方文件可在 [此处](https://dev.vk.com/ru/bridge/overview) 找到。

### Telegram：@tma.js/sdk

`@tma.js/sdk` 库旨在与 Telegram API 交互。  此外，您还可以使用 Ton 钱包对用户进行授权。
标准方法是使用 Ton Proof。 示例如下。 更多信息，请访问 [官方文档](https://docs.ton.org/develop/dapps/ton-connect/sign)。

## 3. 应用程序授权

vk 和 telegram 的主要区别在于如何授权用户。

### VK

#### Backend

Vk 没有授权任何自定义库。 您需要使用密钥手动计算 `signParams` 的哈希值，该密钥在 vk miniapp 设置中提供。

```ts
const VK_APP_SECRET_KEY = 'VK_APP_SECRET_KEY';

function isSignValid(sign: string, signParams: Record<string, string>): boolean {
  const signUrlParams = new URLSearchParams(signParams);
  signUrlParams.sort();

  const queryString = signUrlParams.toString();

  const paramsHash = crypto
    .createHmac('sha256', VK_APP_SECRET_KEY)
    .update(queryString)
    .digest()
    .toString('base64url');

  return paramsHash === sign;
}
```

验证签名参数后，就可以从签名参数中提取用户数据。 例如 `vkUserId`。

```ts
const vkUserId = signParams.vk_user_id;
```

之后，只需将 `vkUserId` 放入数据库或任何地方即可。

#### 前端

使用 `vk-bridge` 获取符号和符号参数数据。

```ts
  const { sign, ...signParams } = await bridge.send('VKWebAppGetLaunchParams');
```

### Telegram

#### 后台

Telegram 也有类似的机制。 但你可以使用软件包 `@tma.js/init-data-node` 来验证`initData`，使用由 `@BotFather` 提供的秘钥，而不是手动验证。

```ts
import { validate } from '@tma.js/init-data-node';

const TG_BOT_SECRET = 'TG_BOT_SECRET';

function isInitDataValid(initDataRaw: string): boolean {
  try {
    validate(initDataRaw, TG_BOT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}
```

验证初始数据后，您可以使用 `@tms.js/init-data-node` 提取用户信息。

```ts
import { parse } from '@tma.js/init-data-node';

const initData = parse(initDataRaw);
const tgUserId = initData.user.id.toString();
```

之后，只需将 `tgUserId` 放入数据库或任何地方即可。

#### 前端

使用`@tma.js/sdk`获取`initDataRaw`。

```ts
  import { retrieveLaunchParams } from '@tma.js/sdk';

  const { initDataRaw } = retrieveLaunchParams();
```

### 使用 Ton 钱包验证（可选）

此外，您还可以使用 Ton 钱包对用户进行授权。
标准方法是使用 Ton Proof。 示例如下。 更多信息，请访问 [官方文档](https://docs.ton.org/develop/dapps/ton-connect/sign)。

#### 后端

```ts
export async function isProofValid(payload: TonProof): Promise<boolean> {
  try {
    const stateInit = loadStateInit(Cell.fromBase64(payload.proof.stateInit).beginParse());
    const publicKey = tryParsePublicKey(stateInit);
    if (!publicKey) {
      return false;
    }

    const walletPublicKey = Buffer.from(payload.publicKey, 'hex');
    if (!publicKey.equals(walletPublicKey)) {
      return false;
    }

    const address = Address.parse(payload.address);
    const walletAddress = contractAddress(address.workChain, stateInit);
    if (!walletAddress.equals(address)) {
      return false;
    }

    if (!ALLOWED_DOMAINS.includes(payload.proof.domain.value)) {
      return false;
    }

    const now = Math.floor(Date.now() / 1000);
    if (now - VALID_AUTH_TIME > payload.proof.timestamp) {
      return false;
    }

    const message = {
      workchain: walletAddress.workChain,
      address: walletAddress.hash,
      domain: {
        lengthBytes: payload.proof.domain.lengthBytes,
        value: payload.proof.domain.value,
      },
      signature: Buffer.from(payload.proof.signature, 'base64'),
      payload: payload.proof.payload,
      stateInit: payload.proof.stateInit,
      timestamp: payload.proof.timestamp,
    };

    const wc = Buffer.alloc(4);
    wc.writeUInt32BE(message.workchain, 0);

    const ts = Buffer.alloc(8);
    ts.writeBigUInt64LE(BigInt(message.timestamp), 0);

    const dl = Buffer.alloc(4);
    dl.writeUInt32LE(message.domain.lengthBytes, 0);

    const msg = Buffer.concat([
      Buffer.from(TON_PROOF_PREFIX),
      wc,
      message.address,
      dl,
      Buffer.from(message.domain.value),
      ts,
      Buffer.from(message.payload),
    ]);

    const msgHash = Buffer.from(await sha256(msg));

    const fullMsg = Buffer.concat([
      Buffer.from([0xff, 0xff]),
      Buffer.from(TON_CONNECT_PREFIX),
      msgHash,
    ]);

    const result = Buffer.from(await sha256(fullMsg));

    return sign.detached.verify(result, message.signature, publicKey);
  } catch (e) {
    return false;
  }
}
```

#### 前端

创建身份验证提供程序示例

```tsx
import {
  ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import {
  useIsConnectionRestored, useTonAddress, useTonConnectModal, useTonConnectUI, useTonWallet,
} from '@tonconnect/ui-react';
import { retrieveLaunchParams } from '@tma.js/sdk-react';
import {
  apiGetSelf, apiGetTonProof, apiLogout, apiPostTgAuthorize, apiPostTonProofAuth,
} from 'services/auth.api';
import { GetAuthSelfResponse, GetAuthTonProofResponse } from 'dtos/auth.dtos';
import { AuthContext } from '../auth.context';

type TAuthProvider = {
  children: ReactNode
};

const payloadTTLMS = 1000 * 60 * 20;

export const AuthTonProvider = ({ children }: TAuthProvider) => {
  const [user, setUser] = useState<GetAuthSelfResponse | null>();
  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const { open } = useTonConnectModal();
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();
  const tonProof = useRef<GetAuthTonProofResponse | null>(null);

  const fetchUser = useCallback(async () => {
    const userResponse = await apiGetSelf();
    setUser(userResponse);
    const { initDataRaw } = retrieveLaunchParams();
    if (!userResponse.tgUserId) {
      await apiPostTgAuthorize(initDataRaw || '');
    }
  }, []);

  const completeAuth = useCallback(async () => {
    if (!isConnectionRestored) {
      return;
    }
    clearInterval(interval.current);
    if (!wallet) {
      setUser(null);
      const refreshPayload = async () => {
        tonConnectUI.setConnectRequestParameters({ state: 'loading' });

        const value = await apiGetTonProof();
        tonProof.current = value;
        if (!value) {
          tonConnectUI.setConnectRequestParameters(null);
        } else {
          tonConnectUI.setConnectRequestParameters({ state: 'ready', value: { tonProof: value.payload } });
        }

      };
      refreshPayload().catch(() => {});
      setInterval(refreshPayload, payloadTTLMS);
      return;
    }

    try {
      await fetchUser();
    } catch (e) {
      if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof) && tonProof.current) {
        try {
          await apiPostTonProofAuth(
            wallet.connectItems.tonProof.proof, wallet.account, tonProof.current,
          );
          await fetchUser();
        } catch (e) {
          alert('Please try another wallet');
          await tonConnectUI.disconnect();
        }
      } else {
        alert('Please try another wallet');
        await tonConnectUI.disconnect();
      }
    }

  }, [fetchUser, isConnectionRestored, tonConnectUI, wallet]);

  useEffect(() => {
    completeAuth();
  }, [completeAuth]);

  const onLogout = useCallback(async () => {
    await tonConnectUI.disconnect();
    await apiLogout();
    setUser(null);
  }, [tonConnectUI]);

  const authContextValue = {
    user,
    setUser,
    onLogout,
    isWalletConnectionRestored: isConnectionRestored,
    address,
    onOpenTonModal: open,
    tonConnectUI,
    fetchUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
```
