<template>
    <div></div>
</template>
<script setup lang="ts">
defineProps({
    // 基本的な型チェック
    // （`null` 値と `undefined` 値は、任意の型を許可します）
    propA: Number,
    // 複数の型の可能性
    propB: [String, Number],
    // 必須の文字列
    propC: {
        type: String,
        required: true
    },
    // 必須だが null になる可能性がある文字列
    propD: {
        type: [String, null],
        required: true
    },
    // デフォルト値を持つ数値
    propE: {
        type: Number,
        default: 100
    },
    // デフォルト値を持つオブジェクト
    propF: {
        type: Object,
        // オブジェクトと配列のデフォルトは、ファクトリー関数を使って
        // 返す必要があります。ファクトリー関数は、コンポーネントが
        // 受け取った未加工の props を引数として受け取ります。
        default(rawProps) {
            return { message: 'hello' }
        }
    },
    // カスタムのバリデーター関数
    // 3.4 以降、全ての props が第 2 引数として渡されます
    propG: {
        validator(value, props) {
            // 値が以下の文字列のいずれかに一致する必要がある
            return ['success', 'warning', 'danger'].includes(value)
        }
    },
    // デフォルト値を持つ関数
    propH: {
        type: Function,
        // オブジェクトや配列のデフォルトと異なり、これは
        // ファクトリー関数ではなく、デフォルト値として機能する関数です
        default() {
            return 'Default function'
        }
    }
})
</script>
