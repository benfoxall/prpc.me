import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { SignalClient } from './lib/signal';
import { useSignal, usePeerClient } from './lib/hooks';

let LOCAL = sessionStorage.getItem('LOCAL_ID') || Math.random().toString(36).slice(1)
sessionStorage.setItem('LOCAL_ID', LOCAL)

export const Join: FunctionComponent<{ name: string }> = ({ name }) => {

    const client = usePeerClient(name);

    useEffect(() => {
        console.log("CLIENT", client)

        if (client) {

            client.on('data', (data) => {
                console.log("YAYYYY, NO SERVER", data)
            })

            setTimeout(() => {
                // client.send(name, "stuff here")
                client.send(new Uint8Array([1, 2, 34]))
            }, 500)


            window.client = client;

        }

    }, [client])

    return (<>
        <h2>
            JOINING <small>({name})</small>
        </h2>
    </>)
}