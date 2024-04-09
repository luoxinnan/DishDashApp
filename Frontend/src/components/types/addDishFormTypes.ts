import { FormEvent } from "react";

export type Props = {
    func : (event: FormEvent<HTMLFormElement>) => void;
}