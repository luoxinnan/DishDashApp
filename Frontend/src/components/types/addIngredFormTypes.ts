import { FormEvent } from "react";
import { FieldValues } from "react-hook-form";

export type Props = {
    func : (value: FieldValues) => void;
}