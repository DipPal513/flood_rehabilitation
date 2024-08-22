
import Sidebar from '@/components/(dashboard)/Sidebar'
import React from 'react'

export default function layout({ children }) {
    return (
        <section className='inline-flex w-full'>
            <Sidebar />
            <main className='sm:p-16 p-6 w-full'>
                {children}
            </main>
        </section>
    )
}
