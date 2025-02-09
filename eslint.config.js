import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import mitsue from "@mitsue/eslint-config";
import typescripteslint from "typescript-eslint";

export default [
    ...mitsue,
    ...typescripteslint.configs.recommended,
    {
        languageOptions: {
            parser: tsparser,
            sourceType: "module",
        },
        plugins: {
            "@typescript-eslint": tseslint,
        },
        rules: {
            indent: [2, 2, { SwitchCase: 1 }],
            "multiline-comment-style": 0,
            "@typescript-eslint/no-var-requires": 0,
            "no-console": 0,
            "no-new": 0,
            "arrow-body-style": 0,
        },
    },
];
