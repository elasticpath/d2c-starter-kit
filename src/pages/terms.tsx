import { withNavServerSideProps } from "../lib/nav-wrapper-ssr";
import Blurb from "../components/shared/blurb";

const Terms = () => <Blurb />;

export default Terms;

export const getServerSideProps = withNavServerSideProps();
