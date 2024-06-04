import Header from "../ui/header";
import TosContent from "../ui/TOS/tosContent";
import Footer from "../ui/footer";

export default function TOS() {
  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <TosContent />
      </div>
      <Footer />
    </div>
  );
}
