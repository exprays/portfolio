import React from 'react';
import { createClient } from "@/prismicio"
import NavBar from './navbar';

export default async function Header() {
    const client = createClient();
    const menubar = await client.getSingle("menubar");

    return (
        <header className='top-0 z-50 mx-auto p-4 md:sticky md:top-4'>
            <NavBar settings={menubar} />
        </header>
    )
}