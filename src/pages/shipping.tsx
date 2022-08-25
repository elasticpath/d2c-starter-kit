import { withNavServerSideProps } from "../lib/nav-wrapper-ssr";
import Blurb from "../components/shared/blurb";

const Shipping = () => <Blurb />;

export default Shipping;

export const getServerSideProps = withNavServerSideProps();
