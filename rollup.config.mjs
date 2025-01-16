import resolve from 'rollup-plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias';
import {defineConfig} from "rollup";


export default defineConfig({
    input: './src/index.ts', // 入口文件
    output: [
        {
            format: 'cjs', // 打包为commonjs格式
            file: 'dist/zhilv-sm4-gm-crypt.cjs.js', // 打包后的文件路径名称
            name: 'zhilv-sm4-gm-crypt' // 打包后的默认导出文件名称
        },
        {
            format: 'esm', // 打包为esm格式
            file: 'dist/zhilv-sm4-gm-crypt.esm.js',
            name: 'zhilv-sm4-gm-crypt'
        },
        {
            format: 'umd', // 打包为umd通用格式
            file: 'dist/zhilv-sm4-gm-crypt.umd.js',
            name: 'zhilv-sm4-gm-crypt',
            minifyInternalExports: true,
            globals: {
                'md5': 'md5',
                'sm4': 'SM4'
            }
        }
    ],
    plugins: [resolve(), alias({
        entries: [
            {find: 'md5', replacement: './src/utils/md5.js'},
            {find: 'sm4', replacement: './src/gm-crypt/sm4.js'}
        ]
    }), typescript({tsconfig: './tsconfig.json'})]
})
