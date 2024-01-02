import SyxParagraph from "../paragraph/SyxParagraph";

/**
 * @component
 * @returns {JSX.Element} - The footer
 */
export default function FooterDefault() {
    console.log('FooterDefault Rendered');
    return (
        <>
        <hr/>
        <SyxParagraph text="© There is no copyright but the right to copy"/>
        </> 
    );
}
