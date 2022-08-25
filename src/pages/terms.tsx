import { withNavServerSideProps } from "../lib/nav-wrapper-ssr";
import Blurb from "../components/shared/blurb";

const Terms = () => <Blurb title="Terms & Conditions" />;

export default Terms;

export const getServerSideProps = withNavServerSideProps();
