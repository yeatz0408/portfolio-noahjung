import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useUIStore } from "../store/useStore";

interface SiteMapInfo {
    uri: string;
    label: string;
}

const NavPane: React.FC = () => {
    const navigate = useNavigate()

    const pageId = useUIStore((state) => state.pageId)
    const isNavPaneOpen = useUIStore((state) => state.isNavPaneOpen)
    const setPageId = useUIStore((state) => state.setPageId)
    const toggleIsNavPaneOpen = useUIStore((state) => state.toggleIsNavPaneOpen)

    const siteMapInfos: SiteMapInfo[] = [
        {
            uri: "/",
            label: "Home"
        },
        {
            uri: "career",
            label: "Career"
        },
        {
            uri: "workout",
            label: "Workout"
        },
        {
            uri: "about",
            label: "About this website"
        },
    ]

    const handleRouting = (info: SiteMapInfo) => {
        setPageId(info.uri)
        navigate(`/${info.uri}`)
    }

    return (<>
        <aside className={classes.sidebar}
            style={{ left: isNavPaneOpen ? '0' : '-12rem ' }}
        >
            <button onClick={() => toggleIsNavPaneOpen()} className={classes.toggleBtn}>
                {isNavPaneOpen ? 'close' : 'open'}
            </button>
            <div className={classes.stack}>
                {
                    siteMapInfos && siteMapInfos.map((info, idx) => (
                        <button onClick={() => handleRouting(info)} className={info.uri === pageId ? classes.activeBtn : classes.btn} key={`${idx}-${info.uri}`}>{info.label}</button>
                    ))
                }
            </div>
        </aside>
    </>)
}

const classes = {
    sidebar: `fixed inset-y-0 w-48 bg-sky-50 border-r border-sky-200 p-4 transition-all duration-350 ease-in-out`,
    stack: "flex flex-col gap-2",
    btn: "w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 transition-all hover:bg-sky-200/50 hover:text-sky-800 hover:translate-x-1 cursor-pointer",
    toggleBtn: `absolute left-full top-[10%] h-[10vh] px-2 bg-sky-50 border-y border-r border-sky-200 rounded-r-md text-xs font-medium text-sky-500 hover:text-sky-800 transition-colors cursor-pointer [writing-mode:vertical-rl]`,
    activeBtn: "w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold bg-sky-500 text-white shadow-md shadow-sky-200 ring-1 ring-sky-600/10 cursor-default",
}

export default NavPane