import styl from './LInk.module.css'
interface LinkProps {
  target: string;
  children: any;
}
export function Link(props: LinkProps) {
  const handleClick = (e: any) => {
    e.preventDefault();
    if (props.target.startsWith("http")) {
      const url = new URL(location.origin + "/jump-confirm");
      url.searchParams.set("target_url", props.target);
      window.location.href = url.toString();
    } else {
      window.location.href = props.target;
    }
  };
  return (
    <a className={`no-underline text-inherit hover:text-inherit focus:text-inherit relative w-full ${styl.link}`} href={props.target} onClick={handleClick}>
      {props.children}
      <div className={styl.svgWave}></div>
    </a>
  );
}
