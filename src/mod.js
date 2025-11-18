const explodingArrowRangeIncrease = +config.explodingArrowRangeIncrease;
const explodingArrowMaxRange = +config.explodingArrowMaxRange;
const explodingArrowFireArrowDgmSynergy = +config.explodingArrowFireArrowDgmSynergy;
const explodingArrowImmolationArrowDgmSynergy = +config.explodingArrowImmolationArrowDgmSynergy;

const immolationArrowRangeIncrease = +config.immolationArrowRangeIncrease;
const immolationArrowMaxRange = +config.immolationArrowMaxRange;
const immolationArrowFireArrowDgmSynergy = +config.immolationArrowFireArrowDgmSynergy;
const immolationArrowExplodingArrowDgmSynergy = +config.immolationArrowExplodingArrowDgmSynergy;
const immolationArrowDgmPerSecondSynergy = +config.immolationArrowDgmPerSecondSynergy;

const freezingArrowRangeIncrease = +config.freezingArrowRangeIncrease;
const freezingArrowMaxRange = +config.freezingArrowMaxRange;
const freezingArrowColdArrowDmgSynergy = +config.freezingArrowColdArrowDmgSynergy;
const freezingArrowIceArrowDmgSynergy = +config.freezingArrowIceArrowDmgSynergy;

// ===== skills.txt =====
const skillsFilename = 'global\\excel\\skills.txt';
const skills = D2RMM.readTsv(skillsFilename);

skills.rows.forEach((row) => {
    if (row.skill === "Exploding Arrow") {
        // Explosion range
        if (explodingArrowRangeIncrease) {
            row.calc1 = `min((skill('Magic Arrow'.blvl))*${explodingArrowRangeIncrease}+3, ${explodingArrowMaxRange})`;
        }
        // Explosion damage synergies
        row.Param8 = explodingArrowFireArrowDgmSynergy;
        row.Param9 = explodingArrowImmolationArrowDgmSynergy;
        row.EDmgSymPerCalc = `(skill('Fire Arrow'.blvl)) * par8 + (skill('Immolation Arrow'.blvl)) * par9`;
    } else if (row.skill === "Immolation Arrow") {
        // Explosion range
        if (immolationArrowRangeIncrease) {
            row.calc2 = `min((skill('Magic Arrow'.blvl))*${immolationArrowRangeIncrease}+3, ${immolationArrowMaxRange})`;
        }
        // Explosion damage synergies
        row.Param8 = immolationArrowExplodingArrowDgmSynergy;
        row.Param9 = immolationArrowFireArrowDgmSynergy;
        row.EDmgSymPerCalc = `(skill('Exploding Arrow'.blvl)) * par8 + (skill('Fire Arrow'.blvl)) * par9`;
    } else if (row.skill === "Freezing Arrow") {
        // Explosion range
        if (freezingArrowRangeIncrease) {
            row.calc1 = `min((skill('Magic Arrow'.blvl))*${freezingArrowRangeIncrease}+3, ${freezingArrowMaxRange})`;
        }
        // Explosion damage synergies
        row.Param8 = freezingArrowColdArrowDmgSynergy;
        row.Param9 = freezingArrowIceArrowDmgSynergy;
        row.EDmgSymPerCalc = `(skill('Cold Arrow'.blvl)) * par8 + (skill('Ice Arrow'.blvl)) * par9`;
    }
});

D2RMM.writeTsv(skillsFilename, skills);

// ===== missiles.txt =====
const missilesFilename = 'global\\excel\\missiles.txt';
const missiles = D2RMM.readTsv(missilesFilename);

missiles.rows.forEach((row) => {
    if (row.Missile === 'explodingarrowexp2') {
        // Explosion Radius (If 0, then use Skill calc1)
        row.sHitPar1 = 0;
    } else if (row.Missile === 'immolationfire') {
        // Damage per second
        row.EDmgSymPerCalc = `skill('Fire Arrow'.blvl) * ${immolationArrowDgmPerSecondSynergy}`;
    } else if (row.Missile === 'freezingarrowexp3') {
        // Explosion Radius (If 0, then use Skill calc1)
        row.sHitPar1 = 0;
    }
});

D2RMM.writeTsv(missilesFilename, missiles);

// ===== skilldesc.txt =====
const skilldescFilename = 'global\\excel\\skilldesc.txt';
const skilldesc = D2RMM.readTsv(skilldescFilename);

skilldesc.rows.forEach((row) => {
    if (row.skilldesc === "exploding arrow") {
        if (explodingArrowImmolationArrowDgmSynergy) {
            row.dsc3line3 = 76;
            row.dsc3texta3 = 'Firedplev';
            row.dsc3textb3 = 'skillname27';
            row.dsc3calca3 = 'par9';
        }
        if (explodingArrowRangeIncrease) {
            row.dsc2line1 = 36;
            row.dsc2texta1 = 'StrSkillRadiusSingular';
            row.dsc2textb1 = '';
            row.dsc2calca1 = `min((skill('Magic Arrow'.blvl))*${explodingArrowRangeIncrease}+3, ${explodingArrowMaxRange})`;
            row.dsc2calcb1 = '';

            row.dsc3line4 = 18;
            row.dsc3texta4 = 'skillname6';
        }
    } else if (row.skilldesc === "immolation arrow") {
        row.dsc3calca2 = immolationArrowDgmPerSecondSynergy;
        if (immolationArrowFireArrowDgmSynergy) {
            row.dsc3line4 = 76;
            row.dsc3texta4 = 'Firedplev';
            row.dsc3textb4 = 'skillname7';
            row.dsc3calca4 = 'par9';
        }
        if (immolationArrowRangeIncrease) {
            row.dsc2line2 = 36;
            row.dsc2texta2 = 'StrSkillRadiusSingular';
            row.dsc2textb2 = '';
            row.dsc2calca2 = `min((skill('Magic Arrow'.blvl))*${immolationArrowRangeIncrease}+3, ${immolationArrowMaxRange})`;
            row.dsc2calcb2 = '';

            row.dsc3line5 = 18;
            row.dsc3texta5 = 'skillname6';
        }
    } else if (row.skilldesc === "freezing arrow") {
        if (freezingArrowIceArrowDmgSynergy) {
            row.dsc3line4 = 76;
            row.dsc3texta4 = 'Colddplev';
            row.dsc3textb4 = 'skillname21';
            row.dsc3calca4 = 'par9';
        }
        if (freezingArrowRangeIncrease) {
            row.dsc2calca1 = `min((skill('Magic Arrow'.blvl))*${freezingArrowRangeIncrease}+3, ${freezingArrowMaxRange})`;
            row.dsc2calcb1 = '';

            row.dsc3line5 = 18;
            row.dsc3texta5 = 'skillname6';
        }
    }
});

D2RMM.writeTsv(skilldescFilename, skilldesc);