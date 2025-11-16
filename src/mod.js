const explodingArrowRangeIncrease = +config.explodingArrowRangeIncrease;
const explodingArrowMaxRange = +config.explodingArrowMaxRange;
const explodingArrowFireArrowDgmSynergy = +config.explodingArrowFireArrowDgmSynergy;
const explodingArrowImmolationArrowDgmSynergy = +config.explodingArrowImmolationArrowDgmSynergy;

const immolationArrowRangeIncrease = +config.immolationArrowRangeIncrease;
const immolationArrowMaxRange = +config.immolationArrowMaxRange;
const immolationArrowFireArrowDgmSynergy = +config.immolationArrowFireArrowDgmSynergy;
const immolationArrowExplodingArrowDgmSynergy = +config.immolationArrowExplodingArrowDgmSynergy;
const immolationArrowDgmPerSecondSynergy = +config.immolationArrowDgmPerSecondSynergy;

// ===== skills.txt =====
const skillsFilename = 'global\\excel\\skills.txt';
const skills = D2RMM.readTsv(skillsFilename);

skills.rows.forEach((row) => {
    if (row["skill"] === "Exploding Arrow") {
        // Explosion range
        row.calc1 = `min((skill('Fire Arrow'.blvl))*${explodingArrowRangeIncrease}+5, ${explodingArrowMaxRange})`;
        // Explosion damage synergies
        row.Param8 = explodingArrowFireArrowDgmSynergy;
        row.Param9 = explodingArrowImmolationArrowDgmSynergy;
        row.EDmgSymPerCalc = `(skill('Fire Arrow'.blvl)) * par8 + (skill('Immolation Arrow'.blvl)) * par9`;
    } else if (row["skill"] === "Immolation Arrow") {
        // Explosion range
        row.calc2 = `min((skill('Fire Arrow'.blvl))*${immolationArrowRangeIncrease}+4, ${immolationArrowMaxRange})`;
        // Explosion damage synergies
        row.Param8 = immolationArrowExplodingArrowDgmSynergy;
        row.Param9 = immolationArrowFireArrowDgmSynergy;
        row.EDmgSymPerCalc = `(skill('Exploding Arrow'.blvl)) * par8 + (skill('Fire Arrow'.blvl)) * par9`;
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
    }
});

D2RMM.writeTsv(missilesFilename, missiles);

// ===== skilldesc.txt =====
const skilldescFilename = 'global\\excel\\skilldesc.txt';
const skilldesc = D2RMM.readTsv(skilldescFilename);

skilldesc.rows.forEach((row) => {
    if (row["skilldesc"] === "exploding arrow") {
        if (explodingArrowImmolationArrowDgmSynergy) {
            row.dsc3line3 = 76;
            row.dsc3texta3 = 'Firedplev';
            row.dsc3textb3 = 'skillname27';
            row.dsc3calca3 = 'par9';
        }
    } else if (row["skilldesc"] === "immolation arrow") {
        row.dsc3calca2 = immolationArrowDgmPerSecondSynergy;
        if (immolationArrowFireArrowDgmSynergy) {
            row.dsc3line4 = 76;
            row.dsc3texta4 = 'Firedplev';
            row.dsc3textb4 = 'skillname7';
            row.dsc3calca4 = 'par9';
        }
    }
});

D2RMM.writeTsv(skilldescFilename, skilldesc);