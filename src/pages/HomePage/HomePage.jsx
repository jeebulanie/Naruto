import React, { useEffect, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./HomePage.css";

import homeLogo from "./images/homeLogo.png";
import team7Big from "./images/team7Big.png";
// Импорты для первой книги

import narutoFirst from "./images/narutoFirst.png";
import firstArcYear from "./images/year_1999 1.png";
import firstArcTitle from "./images/01-title.png";
import znakLista from "./images/znakLista.png";
import mangaFirstLeft from "./images/mangaFirstLeft.png";
import mangaFirstTopCenter from "./images/mangaFirstTopCenter.png";
import mangaFirstRight from "./images/mangaFirstRight.png";
import mangaFirstKissNearSasuke from "./images/MangaFirstKissNearSasuke.png";
import mangaFirstSasukePic from "./images/MangaFirstSasuke.png";
import mangaFirstTextUnderSasuke from "./images/caption_a 1.png";
import mangaFirstSakuraPic from "./images/MangaFirstSakura.png";
import mangaFirstKakashiNearSakura from "./images/mangaFirstKakashiNearSakura.png";
import mangaFirstTextUnderSakura from "./images/caption_b 1.png";
import mangaFirstBubenchiki from "./images/MangaFirstBubenchiki.png";
import mangaFirstTextPodBubenchikami from "./images/caption_c 1.png";

// Импорты для второй книги

import hakuPic from "./images/hakuPic.png";
import mangaTitle2 from "./images/mangaTitle2.png";
import ZabuzaUnderHaku from "./images/ZabuzaUnderHaku.png";
import textUnderZabuza from "./images/TextUnderZabuza.png";
import GrandpaWithSake from "./images/GrandpaWithSake.png";
import hakuWithoutMask from "./images/hakuWithoutMask.png";
import year2000 from "./images/year_2000 1.png";
import kakashiVsZabuza from "./images/kakashiVsZabuza.png";
import sasukeVsHaku from "./images/sasukeVsHaku.png";

// Импорты для третей книги

import year2001 from "./images/year_2001 1.png";
import leeAndNeji from "./images/leeAndNeji.png";
import narutoNearNeji from "./images/narutoNearNeji.png";
import kiba from "./images/kiba.png";
import guyAndLee from "./images/guyAndLee.png";
import sandSphere from "./images/sandSphere.png";
import bookTitle3 from "./images/bookTitle3.png";
import gaaraUpsideDown from "./images/gaaraUpsideDown.png";
import inoVsSakura from "./images/inoVsSakura.png";
import shikamaruAndShino from "./images/shikamruAndShino.png";
import leeVsGaara from "./images/leeVsGaara.png";
import chidoryBySasuke from "./images/chidoryBySasuke.png";

// Импорты для четвертой книги

import bookTitle4 from "./images/bookTitle4.png";
import year2002 from "./images/year_2002 1.png";
import creepingThreat from "./images/creepingThreat.png";
import oruch from "./images/oruch.png";
import sandNinjas from "./images/sandNinjas.png";
import demonOfDeath from "./images/demonOfDeath.png";
import titleNarutoVsGaara from "./images/titleNarutoVsGaara.png";
import babyGaara from "./images/babyGaara.png";
import shukaku from "./images/shukaku.png";
import garaCrying from "./images/garaCrying.png";
import narutoClosedEyes from "./images/narutoClosedEyes.png";
import oruchMask from "./images/oruchMask.png";
import twoHokages from "./images/twoHokages.png";
import titleHiruzenVsOruch from "./images/titleHiruzenVsOruch.png";
import hiruzenDies from "./images/hiruzenDies.png";
import gaaraVsNaruto from "./images/gaaraVsNaruto.png";

// Импорты для пятой книги

import itachi from "./images/itachi.png";
import kakashi from "./images/kakashi.png";
import moonItachi from "./images/moonItachi.png";
import lilSaske from "./images/lilSaske.png";
import saskeChidori from "./images/saskeChidori.png";
import bookTitle5 from "./images/bookTitle5.png";
import kisameAndItachi from "./images/kisameAndItachi.png";
import year2003 from "./images/05-year_2003.png";

const HomePage = () => {
  const [animateTeam7Big, setAnimateTeam7Big] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);

  const onStepEnter = ({ data }) => {
    if (data === "team7Big") {
      setAnimateTeam7Big(true);
    }
  };

  useEffect(() => {
    const mangaElements = document.querySelectorAll(".manga");
    mangaElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animate");
      }, index * 300);
    });
  }, []);

  useEffect(() => {
    const narutoFirstPic = document.getElementById("naruto__first--pic");
    narutoFirstPic.classList.add("animate");
  }, []);

  return (
    <div className="Home">
      <div className="line"></div>
      <div className="home--logo">
        <img src={homeLogo} alt="" />
      </div>
      <div className="home--content">
        <div id="home__first" className="home--odd">
          <div id="naruto__first--pic">
            <img src={narutoFirst} alt="" />
          </div>
          <div className="home--first__about">
            <div className="home--first__h1">
              <h1>NARUTO STORY</h1>
            </div>
            <div className="home--first__descr">
              <div className="home--first__descr--img">
                <img src={znakLista} alt="" />
              </div>
              <p>
                From its debut in 1999, all the way to its stunning conclusion—
                <br />
                look back on the trials and tribulations of an outcast <br />
                ninja’s coming of age and the famous scenes that <br /> shaped
                his story!!
              </p>
            </div>
          </div>
          {/* ГОД ВЫХОДА ПЕРВОЙ ГЛАВЫ - 1999 */}
          <div id="first--arc__year" className="manga">
            <img src={firstArcYear} alt="" />
          </div>
          {/* ПЕРВЫЙ НОМЕР ГЛАВЫ С ОПИСАНИЕМ - 01 */}
          <div id="first--arc__title" className="manga">
            <img src={firstArcTitle} alt="" />
          </div>
          {/* ЛЕВАЯ ЧАСТЬ ПЕРВОЙ МАНГИ */}
          <div id="mangaFirstLeft" className="manga">
            <img src={mangaFirstLeft} alt="" />
          </div>
          {/* ЦЕНТРАЛЬНАЯ ЧАСТЬ ПЕРВОЙ МАНГИ */}
          <div id="mangaFirstCenter" className="manga">
            <img src={mangaFirstTopCenter} alt="" />
          </div>
          {/* ПРАВАЯ ЧАСТЬ ПЕРВОЙ МАНГИ */}
          <div id="mangaFirstRight" className="manga">
            <img src={mangaFirstRight} alt="" />
          </div>
          {/* ФОТО САСКЕ ИЗ ПЕРВОЙ МАНГИ */}
          <div id="mangaFirstSasukePic" className="manga">
            <img src={mangaFirstSasukePic} alt="" />
          </div>
          {/* НАДПИСЬ ПОД САСКЕ */}
          <div id="mangaFirstTextUnderSasuke" className="manga">
            <img src={mangaFirstTextUnderSasuke} alt="" />
          </div>
          {/* ФРЕЙМЫ ИЗ МАНГИ ВОЗЛЕ САСКЕ */}
          <div id="mangaFirstKissNearSasuke" className="manga">
            <img src={mangaFirstKissNearSasuke} alt="" />
          </div>
          {/* ФОТО САКУРЫ ИЗ ПЕРВЫЙ МАНГИ */}
          <div id="mangaFirstSakuraPic" className="manga">
            <img src={mangaFirstSakuraPic} alt="" />
          </div>
          {/* НАДПИСЬ ПОД САКУРОЙ */}
          <div id="mangaFirstTextUnderSakura" className="manga">
            <img src={mangaFirstTextUnderSakura} alt="" />
          </div>
          {/* ФРЕЙМЫ ИЗ МАНГИ ВОЗЛЕ САКУРЫ */}
          <div id="mangaFirstKakashiNearSakura" className="manga">
            <img src={mangaFirstKakashiNearSakura} alt="" />
          </div>
          {/* СЕРИЯ С БУБЕНЧИКАМИ И КОАНДА 7 */}
          <div id="mangaFirstBubenchiki" className="manga">
            <img src={mangaFirstBubenchiki} alt="" />
          </div>
          {/* НАДПИСЬ ПОД БУБЕНЧИКАМИ */}
          <div id="mangaFirstTextPodBubenchikami" className="manga">
            <img src={mangaFirstTextPodBubenchikami} alt="" />
          </div>
        </div>

        <div id="home__second" className="home--even">
          <div id="hakuPic" className="manga">
            <img src={hakuPic} alt="" />
          </div>
          <div id="mangaTitle2" className="manga">
            <img src={mangaTitle2} alt="" />
          </div>
          <div id="ZabuzaUnderHaku" className="manga">
            <img src={ZabuzaUnderHaku} alt="" />
          </div>
          <div id="textUnderZabuza" className="manga">
            <img src={textUnderZabuza} alt="" />
          </div>
          <div id="GrandpaWithSake" className="manga">
            <img src={GrandpaWithSake} alt="" />
          </div>
          <div id="hakuWithoutMask" className="manga">
            <img src={hakuWithoutMask} alt="" />
          </div>
          <div id="year2000" className="manga">
            <img src={year2000} alt="" />
          </div>
          <div id="kakashiVsZabuza" className="manga">
            <img src={kakashiVsZabuza} alt="" />
          </div>
          <div id="sasukeVsHaku" className="manga">
            <img src={sasukeVsHaku} alt="" />
          </div>
        </div>

        <Scrollama onStepEnter={onStepEnter}>
          <Step data="team7Big">
            <div
              id="team7Big"
              className={`home__photo--container ${
                animateTeam7Big ? "animate" : ""
              }`}
            >
              <img src={team7Big} alt="" />
            </div>
          </Step>
        </Scrollama>

        <div id="home__third" className="home--odd">
          <div id="year2001" className="manga">
            <img src={year2001} alt="" />
          </div>
          <div id="leeAndNeji" className="manga">
            <img src={leeAndNeji} alt="" />
          </div>
          <div id="narutoNearNeji" className="manga">
            <img src={narutoNearNeji} alt="" />
          </div>
          <div id="kiba" className="manga">
            <img src={kiba} alt="" />
          </div>
          <div id="guyAndLee" className="manga">
            <img src={guyAndLee} alt="" />
          </div>
          <div id="sandSphere" className="manga">
            <img src={sandSphere} alt="" />
          </div>
          <div id="bookTitle3" className="manga">
            <img src={bookTitle3} alt="" />
          </div>
          <div id="gaaraUpsideDown" className="manga">
            <img src={gaaraUpsideDown} alt="" />
          </div>
          <div id="inoVsSakura" className="manga">
            <img src={inoVsSakura} alt="" />
          </div>
          <div id="shikamaruAndShino" className="manga">
            <img src={shikamaruAndShino} alt="" />
          </div>
          <div id="leeVsGaara" className="manga">
            <img src={leeVsGaara} alt="" />
          </div>
          <div id="chidoryBySasuke" className="manga">
            <img src={chidoryBySasuke} alt="" />
          </div>
        </div>

        <div id="home__fourth" className="home--even">
          <div id="bookTitle4" className="manga">
            <img src={bookTitle4} alt="" />
          </div>

          <div id="year2002" className="manga">
            <img src={year2002} alt="" />
          </div>

          <div id="creepingThreat" className="manga">
            <img src={creepingThreat} alt="" />
          </div>

          <div id="oruch" className="manga">
            <img src={oruch} alt="" />
          </div>

          <div id="sandNinjas" className="manga">
            <img src={sandNinjas} alt="" />
          </div>

          <div id="demonOfDeath" className="manga">
            <img src={demonOfDeath} alt="" />
          </div>

          <div id="titleNarutoVsGaara" className="manga">
            <img src={titleNarutoVsGaara} alt="" />
          </div>

          <div id="babyGaara" className="manga">
            <img src={babyGaara} alt="" />
          </div>

          <div id="shukaku" className="manga">
            <img src={shukaku} alt="" />
          </div>
          <div id="garaCrying" className="manga">
            <img src={garaCrying} alt="" />
          </div>

          <div id="narutoClosedEyes" className="manga">
            <img src={narutoClosedEyes} alt="" />
          </div>

          <div id="oruchMask" className="manga">
            <img src={oruchMask} alt="" />
          </div>

          <div id="twoHokages" className="manga">
            <img src={twoHokages} alt="" />
          </div>

          <div id="titleHiruzenVsOruch" className="manga">
            <img src={titleHiruzenVsOruch} alt="" />
          </div>

          <div id="hiruzenDies" className="manga">
            <img src={hiruzenDies} alt="" />
          </div>

          <div id="gaaraVsNaruto" className="manga">
            <img src={gaaraVsNaruto} alt="" />
          </div>
        </div>

        <div id="home__fifth" className="home--odd">
          <div id="itachi" className="manga">
            <img src={itachi} alt="" />
          </div>
          <div id="kakashi" className="manga">
            <img src={kakashi} alt="" />
          </div>
          <div id="moonItachi" className="manga">
            <img src={moonItachi} alt="" />
          </div>
          <div id="lilSaske" className="manga">
            <img src={lilSaske} alt="" />
          </div>
          <div id="saskeChidori" className="manga">
            <img src={saskeChidori} alt="" />
          </div>
          <div id="bookTitle5" className="manga">
            <img src={bookTitle5} alt="" />
          </div>
          <div id="kisameAndItachi" className="manga">
            <img src={kisameAndItachi} alt="" />
          </div>
          <div id="year2003" className="manga">
            <img src={year2003} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
