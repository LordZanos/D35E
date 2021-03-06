import { HealthConfig } from "./config/health.js";
import { isMinimumCoreVersion } from "./lib.js";

export const registerSystemSettings = function() {
  /**
   * Track the system version upon which point a migration was last applied
   */
  game.settings.register("D35E", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: Number,
    default: 0
  });

  // Health configuration
  game.settings.registerMenu(isMinimumCoreVersion("0.5.6") ? "D35E" : "system",
    "healthConfig", {
      name: "SETTINGS.D35EHealthConfigName",
      label: "SETTINGS.D35EHealthConfigLabel",
      hint: "SETTINGS.D35EHealthConfigHint",
      icon: "fas fa-heartbeat",
      type: HealthConfig,
      restricted: true
    }
  );

  game.settings.register("D35E", "healthConfig", {
    name: "SETTINGS.D35EHealthConfigName",
    scope: "world",
    default: HealthConfig.defaultSettings,
    type: Object,
    config: false,
    onChange: () => {
      game.actors.entities.forEach(o => { o.update({}); });
      Object.values(game.actors.tokens).forEach(o => { o.update({}); });
    }
  });

  /**
   * Register diagonal movement rule setting
   */
  game.settings.register("D35E", "diagonalMovement", {
    name: "SETTINGS.D35EDiagN",
    hint: "SETTINGS.D35EDiagL",
    scope: "world",
    config: true,
    default: "5105",
    type: String,
    choices: {
      "555": "SETTINGS.D35EDiagPHB",
      "5105": "SETTINGS.D35EDiagDMG"
    },
    onChange: rule => canvas.grid.diagonalRule = rule
  });

  /**
   * Experience rate
   */
  game.settings.register("D35E", "experienceRate", {
    name: "SETTINGS.D35EExpRateN",
    hint: "SETTINGS.D35EExpRateL",
    scope: "world",
    config: true,
    default: "medium",
    type: String,
    choices: {
      "slow": "Slow",
      "medium": "Medium",
      "fast": "Fast",
    },
    onChange: () => {
      [...game.actors.entities, ...Object.values(game.actors.tokens)].filter(o => {
        return o.data.type === "character";
      }).forEach(o => {
        o.update({});
        if (o.sheet != null && o.sheet._state > 0) o.sheet.render();
      });
    },
  });
  
  /**
   * System of Units
   */
  game.settings.register("D35E", "units", {
    name: "SETTINGS.D35EUnitsN",
    hint: "SETTINGS.D35EUnitsL",
    scope: "world",
    config: true,
    default: "imperial",
    type: String,
    choices: {
      "imperial": "Imperial (feet, lbs)",
      "metric": "Metric (meters, kg)"
    },
    onChange: () => {
      [...game.actors.entities, ...Object.values(game.actors.tokens)].filter(o => {
        return o.data.type === "character";
      }).forEach(o => {
        o.update({});
        if (o.sheet != null && o.sheet._state > 0) o.sheet.render();
      });
    },
  });

  /**
   * Option to disable XP bar for session-based or story-based advancement.
   */
  game.settings.register("D35E", "disableExperienceTracking", {
    name: "SETTINGS.D35ENoExpN",
    hint: "SETTINGS.D35ENoExpL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  /**
   * Option to allow the background skills optional ruleset.
   */
  game.settings.register("D35E", "allowBackgroundSkills", {
    name: "SETTINGS.D35EBackgroundSkillsN",
    hint: "SETTINGS.D35EBackgroundSkillsH",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => {
      game.actors.entities.forEach(o => { if (o.sheet && o.sheet.rendered) o.sheet.render(true); });
      Object.values(game.actors.tokens).forEach(o => { if (o.sheet && o.sheet.rendered) o.sheet.render(true); });
    },
  });

  /**
   * Option to use the Fractional Base Bonuses optional ruleset.
   */
  game.settings.register("D35E", "useFractionalBaseBonuses", {
    name: "SETTINGS.D35EFractionalBaseBonusesN",
    hint: "SETTINGS.D35EFractionalBaseBonusesH",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => {
      game.actors.entities.forEach(o => { o.update({}); });
      Object.values(game.actors.tokens).forEach(o => { o.update({}); });
    },
  });

  /**
   * Option to automatically collapse Item Card descriptions
   */
  game.settings.register("D35E", "autoCollapseItemCards", {
    name: "SETTINGS.D35EAutoCollapseCardN",
    hint: "SETTINGS.D35EAutoCollapseCardL",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => {
      ui.chat.render();
    }
  });

  /**
   * Option to change measure style
   */
  game.settings.register("D35E", "measureStyle", {
    name: "SETTINGS.D35EMeasureStyleN",
    hint: "SETTINGS.D35EMeasureStyleL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  /**
   * Low-light Vision Mode
   */
  game.settings.register("D35E", "lowLightVisionMode", {
    name: "SETTINGS.D35ELowLightVisionModeN",
    hint: "SETTINGS.D35ELowLightVisionModeH",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  /**
   * Preload Compendiums
   */
  // game.settings.register("D35E", "preloadCompendiums", {
    // name: "SETTINGS.D35EPreloadCompendiumsN",
    // hint: "SETTINGS.D35EPreloadCompendiumsH",
    // scope: "client",
    // config: true,
    // default: false,
    // type: Boolean,
  // });

};
