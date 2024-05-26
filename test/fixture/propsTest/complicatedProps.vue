<template>
    <div></div>
</template>
<script>
export default {
    props: {
        propA: {
            type: Number,
        },
        propB: {
            type: [String, Number],
        },
        propC: {
            type: String,
            required: true
        },
        propD: {
            type: [String, null],
            required: true
        },
        propE: {
            type: Number,
            default: 100
        },
        propF: {
            type: Object,
            default(rawProps) {
                return { message: 'hello' }
            }
        },
        propG: {
            validator(value, props) {
                return ['success', 'warning', 'danger'].includes(value)
            }
        },
        propH: {
            type: Function,
            // オブジェクトや配列のデフォルトと異なり、これは
            // ファクトリー関数ではなく、デフォルト値として機能する関数です
            default() {
                return 'Default function'
            }
        },
    },
};
</script>
