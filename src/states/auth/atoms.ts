import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// NOTE: persistを使うとatomを永続化（リロードしても消えない）できる
export const sessionKeyState = atom<string>({
    key: "SessionKey",
    default: "", 
    effects_UNSTABLE: [persistAtom],
});
