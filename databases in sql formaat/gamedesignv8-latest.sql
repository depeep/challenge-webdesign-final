-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 30 jan 2026 om 20:14
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamedesign`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `antwoorden`
--

CREATE TABLE `antwoorden` (
  `id` int(11) NOT NULL,
  `usersid` int(11) NOT NULL,
  `leskaartenid` int(11) NOT NULL,
  `antwoord` text NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `antwoorden`
--

INSERT INTO `antwoorden` (`id`, `usersid`, `leskaartenid`, `antwoord`, `score`) VALUES
(1, 14, 3, 'test', 0),
(2, 14, 5, 'test', 0),
(3, 14, 13, 'mooi hoor', 0),
(4, 17, 3, 'dit is gelukt', 0),
(5, 17, 4, 'www.spelgemaakt.com', 0),
(6, 17, 3, 'Het is gelukt', 0),
(7, 17, 3, 'Het is goed gelukt', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `leerlingen`
--

CREATE TABLE `leerlingen` (
  `id` int(11) NOT NULL,
  `naam` varchar(100) NOT NULL,
  `gebruikersnaam` varchar(100) DEFAULT NULL,
  `wachtwoord` varchar(100) DEFAULT NULL,
  `actief` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `leerlingen`
--

INSERT INTO `leerlingen` (`id`, `naam`, `gebruikersnaam`, `wachtwoord`, `actief`) VALUES
(14, 'Johan Cruyff', 'j.cruyff', 'nummer14', 1),
(2222, 'Klaas Vaak', 'kvaak', 'dfjajdfl', 1),
(3456, 'Kobus Kucht', 'k.kuch', 'kobus113', 1),
(4321, 'snerben', 's.vandernerf', 'qqwertyy', 1),
(5678, 'Klaas soms', 'k.soms', '12344321', 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `leskaarten`
--

CREATE TABLE `leskaarten` (
  `id` int(11) NOT NULL,
  `titel` text NOT NULL,
  `theorie` text NOT NULL,
  `afb1` text NOT NULL,
  `afb2` text NOT NULL,
  `opdracht` text NOT NULL,
  `extra` text NOT NULL DEFAULT 'leeg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `leskaarten`
--

INSERT INTO `leskaarten` (`id`, `titel`, `theorie`, `afb1`, `afb2`, `opdracht`, `extra`) VALUES
(2, 'Introductie', 'Welkom bij de module gamedesign.<br>\nVoor deze module moet je opdrachten doen op de computer en in dit moduleboekje. De opdrachten zijn te herkennen aan het icoon hiernaast. Als er wat ingestuurd moet worden verschijnt er automatisch een antwoordvak. <br>  \nVeel plezier met deze module!', './img/controller-icon.png', '', '', ''),
(3, 'Het gereedschap', 'Voor een timmerman een kast in elkaar kan zetten, moet hij leren hoe hij zijn gereedschappen gebruikt. Het gereedschap dat wij voor deze module gebruiken is Makecode Arcade. In dit eerste deel leer je de basisvaardigheden om een game te maken met dit gereedschap.', './img/makecode.png', './img/signin.png', '<br>1.	Ga naar makecode.com<br> 2.	Kies voor Arcade. <br>3.	Klik op “sign in”(rechtboven)<br>  4.	Maak een account aan met je school-mail. Kies daarvoor “Continue with Microsoft” <br>5.	Scroll naar “Tutorials”<br>    6.	Werk de volgende tutorials door en sla steeds het resultaat op door ze in te vullen in het antwoordveld', 'x'),
(4, 'Tutorial \"intro\"', '', '', './img/tut_intro.png', '<br>\n<b>intro </b><br> \nWerk de tutorial \"intro\" door<br>\nKlik op delen (share), plak de link hieronder en stuur hem in! ', 'x'),
(5, 'Chase the Pizza', '', '', './img/tut_chase.png', '<br>Werk de tutorial \"Chase the Pizza\" door. Als je klaar bent plak je de link naar je resultaat hieronder en lever je hem in met de knop inleveren.', 'x'),
(13, 'Tutorial Collect the Clovers', '', '', './img/tut_collect.png', '<br>Werk de tutorial \"Collect the Clovers\" door. Als je klaar bent plak je de link naar je resultaat hieronder en lever je hem in met de knop inleveren.', 'ja'),
(14, 'Tutorial Dunk', '', '', './img/tut_dunk.png', '<br>Werk de tutorial \"Dunk\" door. Als je klaar bent plak je de link naar je resultaat hieronder en lever je hem in met de knop inleveren.', 'ja'),
(15, 'Tutorial Target Practice', '', '', './img/tut_target.png', '<br>Werk de tutorial \"Target Practice\" door. Als je klaar bent plak je de link naar je resultaat hieronder en lever je hem in met de knop inleveren.', 'z'),
(16, 'Tutorial Galga', '', '', './img/tut_galga.png', '<br>Werk de tutorial \"Galga\" door. Als je klaar bent plak je de link naar je resultaat hieronder en lever je hem in met de knop inleveren.', 'x'),
(17, 'Tutorial Maze', '', '', './img/tut_maze.png', '<br>Werk de tutorial \"Maze\" door. Als je klaar bent plak je de link naar je resultaat hieronder en lever je hem in met de knop inleveren.', 'ja'),
(18, 'Tutorial Side Scroller', '', '', './img/tut_side.png', '<br>Werk de tutorial \"Side Scroller\" door. Als je klaar bent plak je de link naar je resultaat hieronder en lever je hem in met de knop inleveren.', ''),
(19, 'Gametheorie', '<b>Over de gameprincipes van succesvolle games.</b><hr>\nElke goede game bevat een paar belangrijke gameprincipes. In dit onderdeel van de module leer je meer over de vier gameprincipes die onmisbaar zijn voor een goede game:<br><br>\n1.	Duidelijkheid<br>\n2.	Gameflow & leren<br>\n3.	Betrokkenheid<br>\n4.	Beloning<br>\n', '', '', '', ''),
(20, 'Gameprincipe 1: Duidelijkheid', 'In elk spel heb je spelregels die ervoor zorgen dat iedere gamer weet waar hij aan toe is. Alles wat ervoor moet zorgen om een spel succesvol af te ronden en hoeveel punten je daarvoor krijgt, noem je de spelregels. De spelregels worden vaak in het begin van de game duidelijk gemaakt. Dat kan met tekst maar ook vooral met symbolen, pictogrammen en voorbeelden. Je hoeft niet alles in één keer uit te leggen. Met Just In Time informatie (JIT) zorg je ervoor dat er geen overkill aan informatie op één moment komt. Na een paar levels heb je wellicht nieuwe functies in de game, die pas op dat moment uitgelegd worden.<br>\nHet doel van de game is natuurlijk ook van groot belang, het doel moet duidelijk zijn voor de gamer. Dit kan vaak in één heldere zin duidelijk gemaakt worden bijvoorbeeld: \"bevrijd de prinses!\".<br>\nMaak overzicht voor de gamer\n\n', '', '', '', ''),
(21, 'Gameprincipe 2: Gameflow & leren', 'Een populaire term bij gamedevelopers is de gameflow. <br>\nAls een gamer in een bepaalde flow komt is de game leuk en verslavend. Met een goede balans tussen de uitdagingen (challenges) en de gevraagde vaardigheden (skills) raakt de gamer in een gameflow. <br>De game moet dus zo worden ingericht dat het niveau na elk level omhoog gaat, anders wordt het te saai. Maar als het niveau te snel omhoog gaat raakt de gamer gefrustreerd. Nu is die frustratie minder erg dan wanneer het te saai is. Liever iets te moeilijk dan te makkelijk dus.\n<BR><BR>\n<img src= \"./img/flowgrafiek.png\">\n<br><BR>\nFeedback zorgt voor een belangrijke positieve bijdrage aan de ontwikkeling van de skills van de gamer. <br>Hier komen we bij een van de belangrijkste voordelen van een game ten opzichte van een opdracht op papier: <br> In een game krijgt de gamer direct feedback als hij het niet goed doet. De gamer reflecteert supersnel zijn eigen methode en probeert het opnieuw. <br>Dit is erg leerzaam en op die manier ontwikkelt de gamer skills.\n', '', '', '', ''),
(22, 'Gameprincipe 3: Betrokkenheid', 'Je kan een geweldig gameconcept hebben bedacht die door het gebrek aan betrokkenheid een toch een flop wordt. Wanneer de gamer zich kan verplaatsen in een bepaald karakter en/of fantasiewereld, zorgt dat automatisch voor meer betrokkenheid. <br>Een goede <b>verhaallijn</b> met een mooi einddoel kan daar aan bijdragen. Men noemt dit RPG spellen, dat staat voor Role Playing Game. Of RPG geschikt is, hangt wel een beetje van het gekozen thema af. Veel populaire spellen hebben geen verhaallijn, denk bijvoorbeeld aan Candy Crush. Daar is een verhaallijn niet echt nodig. Bij de game Villa Elektra is dat anders. De verhaallijn is de rode draad van de game. Dit zorgt voor meer beleving en betrokkenheid.\n<br><br>\n<b>Grafisch</b> moet het kloppen; om een gamer betrokken te houden is het belangrijk dat de game netjes is afgewerkt. Als het grafisch slordig is leidt dat af. Op de website www.opengameart.org vind je wellicht bruikbare (vector) tekeningen voor jouw game.\n<br><br>\nAls jouw gameconcept het toelaat kan een bepaalde vorm van <b>competitie</b> een geweldige meerwaarde zijn. Als gamers een score kunnen behalen en die kunnen vergelijken met anderen, ontstaat er echt een competitiesfeer.<br><br>\nEn dan nog de <b>gamesounds</b>. Een heel belangrijk onderdeel van de game. Speel maar eens een willekeurig spelletje en let dan op de geluidseffecten. Ze zorgen voor veel informatie, feedback en beloning! Een game zonder geluid is als een film zonder geluid. Veel gamedevelopers maken gebruik van de website www.freesound.org. Daar vind je een enorme database van allemaal geluiden. En met het programma Audacity kun je zelf geluidsfragmenten bewerken.\n', '', '', '<br>\nHet Klokhuis heeft over geluid bij games een <a href= \"https://schooltv.nl/video/het-klokhuis-geluid-bij-games/\" target=\"_blank\">aflevering </A> gemaakt.<br>\nBekijk de video en beantwoord de volgende vragen:<br><br>\n1. Hoe noemen we het als een beweging zicht op het scherm telkens herhaalt?\n<br>2. Hoeveel geluidseffecten zitten er volgens het filmpje al gauw in een goede game?\n<br>3. Wat is de reden dat de geluidseffecten niet buiten opgenomen worden, maar in de studio?\n<br>4. \nWat is het grote verschil tussen muziek voor films en muziek voor games?\n\n\n\n', 'ja'),
(23, 'Gameprincipe 4: Beloning', 'Stel je voor, je hebt een uur lopen zwoegen op één level en eindelijk, na de zoveelste keer, is het je gelukt om het level uit te spelen. Je bereidt je vast voor op een muzikale of visuele beloning maar er komt helemaal niets!<br> Wat een teleurstelling.<br>\nEen sterretje, een leuk geluidje, een badge, new achievements, een goede score of het vrijspelen van nieuwe levels. Het zijn allemaal beloningen en erg belangrijk voor de gamer. Het motiveert de gamer om door te gaan en nieuwe levels uit te spelen.\n', '', '', '', ''),
(24, 'Keuzes maken 1. De grote lijnen', 'Bij het ontwerpen van een nieuwe game ben je in principe niet gebonden aan bepaalde gamevormen. De mogelijkheden zijn eindeloos. Toch zien we een aantal gamevormen vaak terug.\n<br><br>\n<b>2D of 3D:</b> De eerste keuze die je zal moeten maken is of je een tweedimensionale of driedimensionale game gaat maken. Aangezien het maken van een 3D game erg ingewikkeld is, beginnen we met een 2D game.  2D games zijn de laatste jaren erg populair geworden. Het grootste gedeelte van de games die te downloaden zijn uit de appstore of playstore zijn tweedimensionaal. De doelgroep is dus ook gewend om 2D games te spelen.\n<br><br>\n<b>Multiplayer of singleplayer:</b> Met meerdere spelers tegelijk spelen of juist alleen? Als beginnend gamedeveloper is de keuze snel gemaakt. Multiplayer games zijn erg lastig om te maken. Je kan wel redelijk eenvoudig een multiplayer game ontwikkelen die vanaf één scherm gespeeld wordt. Denk bijvoorbeeld aan het spel Worms. Je kan in dat spel om de beurt een worm bedienen.\n', '', '', '', ''),
(25, 'Keuzes maken 2: Gamevormen', '<b>Levels:</b> <br>Een populaire gamevorm is een vorm met een duidelijke levelstructuur. Elk level moet worden vrijgespeeld. Begin bij level 1; het niveau is erg makkelijk en de gamer leert vooral de spelregels kennen. Per level loopt het niveau op. Met deze vorm kan je vrij goed de skills en challenges op elkaar afstemmen zodat er een mooie gameflow ontstaat. Tevens kan je de leerdoelen makkelijk onderverdelen in de levels.\n<br><br>\nVoorbeelden: Angry Birds, Candy Crush en Power.\n<br><br>\n<b>Wereld met missies:</b><br> Een andere gamevorm is een wereld waarin de tijd verstrijkt en waar je verschillende missies moet uitvoeren. De missies en opdrachten worden steeds moeilijker. Programmeertechnisch is dit wat lastiger om te ontwikkelen. Als het je lukt om een interessante wereld te ontwikkelen met boeiende missies, is hetvoordeel is dat de game minder snel verveelt.\n<br><br>\nVoorbeelden: GTA, Clash of Clans en Ecovilla.\n<br><br>\n<b>Minigame:</b><br> Een kort spelletje dat slechts 5 á 10 minuten duurt. Het kan voor even heel vermakelijk zijn voor de gamer. Het voordeel is dat je in korte tijd een leuke game kan creëren. Als je voor het eerst een game ontwikkelt is dit dus misschien wel een optie.\n<br><br>\nVoorbeelden: sommige telefoonspelletjes, in-game spelletjes\n\n', '', '', '', ''),
(26, 'Wensen van de opdrachtgever', 'De wensen van je opdrachtgever bepalen uiteraard voor een groot deel hoe je game er uit gaat zien. Het is daarom belangrijk om die wensen van tevoren goed in beeld te krijgen. Gelukkig kun je daarna nog veel eigen elementen in beeld brengen.<br><br>\n\nEr zijn 5 opdrachtgevers en 1 vrije opdracht met eigen keuze, jij mag een opdracht kiezen:\n<br><br>\n1.	<b>Soort spel:</b> Een actiespel. <br><b>Doelgroep: </b>Kinderen in de leeftijd van 6-8 jaar. Grove verhaallijn: Het spel speelt zich af in een fantasiewereld waarin de speler een ridder speelt die monsters moet verslaan om de prinses te redden.\n<br><br>\n2.	<b>Soort spel:</b> Een racespel. <br><b>Doelgroep: </b>Tieners in de leeftijd van 13-16 jaar. Grove verhaallijn: Het spel speelt zich af in een futuristische wereld waarin de speler een hovercraft bestuurt en moet racen tegen andere hovercrafts.\n<br><br>\n3.	<b>Soort spel:</b>Een puzzelspel. <br><b>Doelgroep:</b> Volwassenen van alle leeftijden. Grove verhaallijn: Het spel speelt zich af in een mysterieus landhuis waarin de speler verschillende puzzels moet oplossen om te ontsnappen.\n<br><br>\n4.	<b>Soort spel:</b> Een platformspel.<br><b> Doelgroep: </b>Kinderen in de leeftijd van 8-10 jaar. Grove verhaallijn: Het spel speelt zich af in een magische wereld waarin de speler een tovenaar speelt die verschillende obstakels moet overwinnen om het einde van het level te bereiken.\n<br><br>\n5.	<b>Soort spel:</b> Een schietspel.<br><b> Doelgroep:</b> Tieners in de leeftijd van 14-16 jaar. Grove verhaallijn: Het spel speelt zich af in een post-apocalyptische wereld waarin de speler een overlevende is die zombies moet neerschieten om te overleven.\n<br><br>\n6.	<b>Eigen Keuze:</b>  Kies zelf het soort spel en de doelgroep. Schrijf bij deze keuze zelf de grove verhaallijn in 1 zin op in het vak hieronder\n', '', '', '<br><br>\nGeef aan voor welke opdracht je kiest en waarom.', 'ja'),
(27, '4. Een game ontwerpen', 'In het volgende deel ga je een game ontwerpen\n<br>\ndaarbij zul je verschillende stappen doorlopen zoals brainstormen, een vormgeving verzinnen, schetsen enz.\n\nDeze stappen zijn belangrijk voor een goed ontwerp.  ', '', '', '', '');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `naam` varchar(100) NOT NULL,
  `rol` enum('docent','leerling') NOT NULL DEFAULT 'leerling'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `created_at`, `naam`, `rol`) VALUES
(10, 'sjakie@choco.com', '$2b$12$Prb4FTryWf7JlXVrdhhdTeCHmIFEHWWGp3mXQ20giH5ki/aS/6lTa', '2026-01-28 17:32:15', 'Sjakie Choco', 'docent'),
(17, 'leerling1@school.nl', '$2b$12$ymecl3hgA7ZKk4lVmLQPp.vmYq9qpEUTd6fT9T4zm6cL2dytSUi/i', '2026-01-29 18:25:36', 'Leerling1', 'leerling'),
(18, 'leerling2@school.nl', '$2b$12$QpQT08OP6ZVKN5M9HDTheuARveubX4LPbEpC1ljA/bAnh9VDWiHQi', '2026-01-30 15:01:33', 'leerling vijf', 'leerling'),
(19, 'docent1@school.nl', '$2b$12$w5LKdD80/eKqNjQQp54upeC5x3birdZbUnSzp/NElTsUwbf/gO4kS', '2026-01-30 17:19:55', 'docent1', 'docent');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `antwoorden`
--
ALTER TABLE `antwoorden`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `leerlingen`
--
ALTER TABLE `leerlingen`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `leskaarten`
--
ALTER TABLE `leskaarten`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `antwoorden`
--
ALTER TABLE `antwoorden`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT voor een tabel `leskaarten`
--
ALTER TABLE `leskaarten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
