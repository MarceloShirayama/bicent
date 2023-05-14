import Page from "../template/page";
import Advantages from "./advantages";
import Footer from "./footer";
import Header from "./header";
import Highlight from "./highlight";
import Reviews from "./reviews";

export default function Landing() {
  return (
    <Page external>
      <Header />
      <Highlight />
      <Advantages />
      <Reviews />
      <Footer />
    </Page>
  );
}
