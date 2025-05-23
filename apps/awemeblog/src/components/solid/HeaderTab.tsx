import {Link} from "./Link.tsx";
import {createSignal, Show} from "solid-js";
import styles from "./HeaderTab.module.css";

/** @jsxImportSource solid-js */
interface HeaderTabProps {
    data: {
        name: string;
        children?: {
            name: string;
            url: string;
        }[];
        childrenWithYears?: Record<string, {
            name: string;
            url: string;
        }>
    };
}

export function HeaderTab(props: HeaderTabProps) {
    const [show, setShow] = createSignal(false);

    const handleMouseEnter = () => {
        setShow(true);
    };
    const handleMouseLeave = () => {
        setShow(false);
    };
    return (
        <div
            style={{
                padding: "4px 8px",
                "border-radius": "4px",
                background: "rgba(0 0 0 / 0.05)",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {props.data.name}
            <Show when={show()}>
                <div style={{
                    position: "relative",

                }}>
                    <div
                        style={{
                            "min-width": "120px",
                            "width": "max-content",
                            display: "flex",
                            "flex-direction": "column",
                            position: "absolute",
                            background: "white",
                            padding: "8px",
                            "border-radius": "8px",
                            border: "1px solid #ddd",
                            "z-index": 1,
                            'max-height': '50vh',
                            overflow: 'auto'
                        }}
                        class={styles["item-list"]}
                    >
                        {/*{JSON.stringify(props.data.childrenWithYears, undefined, 2)}*/}
                        {Object.entries(props.data.childrenWithYears ?? {}).sort((a,b) => b[0] - a[0]).map(([year, dataList]) => (
                            <>
                                <div style={{color: 'gray', 'text-align': 'center', 'font-size': '11px'}}>{year}</div>
                                {dataList?.map((data) => (
                                    <HeaderTabItem data={data} key={data.url}/>
                                ))}
                            </>

                        ))}
                        {(props.data.children ?? []).map((data) => (
                            <HeaderTabItem data={data} key={data.url}/>
                        ))}
                    </div>
                </div>
            </Show>
        </div>
    );
}

interface HeaderTabItemProps {
    data: {
        name: string;
        url: string;
    };
}

function HeaderTabItem(props: HeaderTabItemProps) {
    return (
        <Link target={props.data.url}>
            <div class={styles.item}>{props.data.name}</div>
        </Link>
    );
}
