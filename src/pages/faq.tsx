import { withNavServerSideProps } from "../lib/nav-wrapper-ssr";
import Blurb from "../components/shared/blurb";

const FAQ = () => <Blurb />;

export default FAQ;

export const getServerSideProps = withNavServerSideProps();
