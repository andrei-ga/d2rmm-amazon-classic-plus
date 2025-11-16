const explodingArrowRangeIncrease = +config.explodingArrowRangeIncrease;
const explodingArrowMaxRange = +config.explodingArrowMaxRange;
const explodingArrowDgmSynergy = +config.explodingArrowDgmSynergy;

const immolationArrowRangeIncrease = +config.immolationArrowRangeIncrease;
const immolationArrowMaxRange = +config.immolationArrowMaxRange;
const immolationArrowDgmSynergy = +config.immolationArrowDgmSynergy;
const immolationArrowDgmPerSecondSynergy = +config.immolationArrowDgmPerSecondSynergy;

// ===== skills.txt =====
const skillsFilename = 'global\\excel\\skills.txt';
const skills = D2RMM.readTsv(skillsFilename);

skills.rows.forEach((row) => {
    if (row["skill"] === "Exploding Arrow") {
        // Explosion range
        row.calc1 = `min((skill('Fire Arrow'.blvl))*${explodingArrowRangeIncrease}+5, ${explodingArrowMaxRange})`;
        // Explosion damage synergy
        row.Param8 = explodingArrowDgmSynergy;
    } else if (row["skill"] === "Immolation Arrow") {
        // Explosion range
        row.calc2 = `min((skill('Fire Arrow'.blvl))*${immolationArrowRangeIncrease}+4, ${immolationArrowMaxRange})`;
        // Explosion damage synergy
        row.Param8 = immolationArrowDgmSynergy;
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
        row.EDmgSymPerCalc = `skill('Fire Arrow'.lvl) * ${immolationArrowDgmPerSecondSynergy}`;
    }
});

D2RMM.writeTsv(missilesFilename, missiles);

// ===== skilldesc.txt =====
const skilldescFilename = 'global\\excel\\skilldesc.txt';
const skilldesc = D2RMM.readTsv(skilldescFilename);

skilldesc.rows.forEach((row) => {
    if (row["skilldesc"] === "immolation arrow") {
        row["dsc3calca2"] = immolationArrowDgmPerSecondSynergy;
    }
});

D2RMM.writeTsv(skilldescFilename, skilldesc);