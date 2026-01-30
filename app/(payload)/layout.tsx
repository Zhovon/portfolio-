import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

import config from '../../payload.config'
import { importMap } from './importMap'
// import './custom.css'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <RootLayout
        config={config}
        importMap={importMap}
        serverFunction={async (args) => {
            'use server'
            return handleServerFunctions({
                ...args,
                config,
                importMap,
            })
        }}
    >
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    (function() {
                        try {
                            if (typeof localStorage === 'undefined') {
                                throw new Error('localStorage not available');
                            }
                            localStorage.setItem('payload-test', 'test');
                            localStorage.removeItem('payload-test');
                        } catch (e) {
                            console.warn('LocalStorage not available, using mock storage');
                            const mockStorage = {
                                data: {},
                                getItem: function(key) { return this.data[key] || null; },
                                setItem: function(key, value) { this.data[key] = String(value); },
                                removeItem: function(key) { delete this.data[key]; },
                                clear: function() { this.data = {}; },
                                key: function(index) { return Object.keys(this.data)[index] || null; },
                                get length() { return Object.keys(this.data).length; }
                            };
                            try {
                                Object.defineProperty(window, 'localStorage', { 
                                    value: mockStorage,
                                    writable: false,
                                    configurable: true
                                });
                                Object.defineProperty(window, 'sessionStorage', { 
                                    value: mockStorage,
                                    writable: false,
                                    configurable: true
                                });
                            } catch (defineError) {
                                window.localStorage = mockStorage;
                                window.sessionStorage = mockStorage;
                            }
                        }
                    })();
                `
            }}
        />
        {children}
    </RootLayout>
)

export default Layout
