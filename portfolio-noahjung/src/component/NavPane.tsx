import React, { useState } from 'react'

const NavPane: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const buttons = ["Home", "Career", "Workout", "About this website"]

    return (<>
        <aside className={classes.sidebar}
            style={{ left: isOpen ? '0' : '-16rem ' }}
        >
            <button onClick={() => setIsOpen(!isOpen)} className={classes.toggleBtn}>
                {isOpen ? 'close' : 'open'}
            </button>
            <div className={classes.stack}>
                {
                    buttons && buttons.map((button, idx) => (
                        <button className={classes.btn} key={`${idx}-${button}`}>{button}</button>
                    ))
                }
            </div>
        </aside>
    </>)
}

const classes = {
    sidebar: `fixed inset-y-0 w-64 bg-zinc-50 border-r border-zinc-200 p-4 transition-all duration-350 ease-in-out`,
    stack: "flex flex-col gap-2",
    btn: "w-full text-left px-4 py-2 rounded-md text-sm font-medium text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer",
    toggleBtn: `absolute left-full top-[10%] h-[10vh] px-2 bg-zinc-50 border-y border-r border-zinc-200 rounded-r-md text-xs font-medium text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer [writing-mode:vertical-rl]`,
}

export default NavPane