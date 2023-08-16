import {
  batch,
  Fade,
  Animator,
  MoveOut,
  ScrollContainer,
  ScrollPage,
  Sticky,
  StickyIn,
  FadeIn,
  ZoomIn,
} from "react-scroll-motion";

import "./PlasticDetection.css";
import Myimage from "./Scrollpage.jpg";

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Sticky());
export default function PlasticDetection() {
  return (
    <div className="App">
      <ScrollContainer>
        <ScrollPage page={0}>
          <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
            <h1>Plastic Detection</h1>
            <p>
              Plastic endangers nature and humans. Its extensive use leads to
              pollution that harms animals, oceans, and landscapes. Plastic does
              not easily break down, causing lasting damage. Even small pieces
              of plastic contaminate our food, making us sick. However,
              communities, governments, and industries collaborate to fight this
              pollution and safeguard our planet.
            </p>
          </Animator>
        </ScrollPage>
        <ScrollPage page={1}>
          <Animator animation={ZoomInScrollOut}>
            <h1>Plastic V/s Tech</h1>
            <p>
              In a world where pollution caused by plastic is increasing, we
              present a solution that combines drone technology with Artificial
              Intelligence. Our website deploys an Artificial Intelligence model
              which detects plastic wastes found in rivers with high accuracy
              using drone images.
            </p>
          </Animator>
        </ScrollPage>
        <ScrollPage page={2}>
          <Animator animation={FadeUp}>
            <h1>Healing Together </h1>
            <p>
              In the tear-stained currents, both human and aquatic souls suffer.
              Our carelessness poisons the very waters we depend on. Imagine
              their silent cries, creatures innocent yet condemned by our waste.
              Let us mend this heartbreak we have caused. Let rivers be a
              sanctuary again… Just like the olden times blissfully; When lives
              were thriving peacefully.
            </p>
          </Animator>
        </ScrollPage>
        <ScrollPage page={3}>
          <div className="section-1">
            <Animator animation={ZoomIn()}>
              <div className="left">
                <img alt="platic" src={Myimage}/>
              </div>
            </Animator>
            <div className="right">
              <Animator animation={FadeIn()}>
                <h2>Let's Begun</h2>

                <p>
                  Here, the limits of innovation are redefined. The shift of
                  paradigm towards a plastic-free environment and a more
                  inclusive mindset is a journey that requires each of us to
                  play an active role. Every small effort contributes to the
                  larger goal of creating a planet where all beings can thrive
                  peacefully.
                </p>
              </Animator>
            </div>
          </div>
        </ScrollPage>
      </ScrollContainer>
    </div>
  );
}

