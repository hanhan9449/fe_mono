import {Link} from "./Link.tsx";
import {createSignal, Show} from "solid-js";

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
            className={'px-2 py-1 rounded bg-black/5'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {props.data.name}
            <Show when={show()}>
              <div className={'relative'}
              >
                <div
                  className={'min-w-[120px] w-max flex flex-col absolute bg-white p-2 rounded-lg border-1 border-solid border-gray-200 z-1 max-h-[50vh] overflow-auto gap-1'}
                >
                  {Object.entries(props.data.childrenWithYears ?? {}).sort((a,b) => b[0] - a[0]).map(([year, dataList]) => (
                    <>
                      <div className={'text-gray-500 text-center text-xs'}>{year}</div>
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
            <div className={'px-2 py-1.5 rounded  hover:bg-gray-400/10'}>{props.data.name}</div>
        </Link>
    );
}
