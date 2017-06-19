export interface ServerProperties {
  generatorSettings?: string;
  opPermissionLevel?: number;
  allowNether?: boolean;
  levelName?: string;
  enableQuery?: boolean;
  allowFlight?: boolean;
  announcePlayerAchievements?: boolean;
  serverPort?: number;
  maxWorldSize?: number;
  levelType?: string;
  enableRcon?: boolean;
  levelSeed?: string;
  forceGamemode?: boolean;
  serverIp?: string;
  networkCompressionThreshold?: number;
  maxBuildHeight?: number;
  spawnNpcs?: boolean;
  whiteList?: boolean;
  spawnAnimals?: boolean;
  hardcore?: boolean;
  snooperEnabled?: boolean;
  resourcePackSha1?: string;
  onlineMode?: boolean;
  resourcePack?: string;
  pvp?: boolean;
  difficulty?: number;
  enableCommandBlock?: boolean;
  gamemode?: number;
  playerIdleTimeout?: number;
  maxPlayers?: number;
  maxTickTime?: number;
  spawnMonsters?: boolean;
  generateStructures?: boolean;
  viewDistance?: number;
  motd?: string;
}

export const defaultServerProperties: ServerProperties = {
  generatorSettings: '',
  opPermissionLevel: 4,
  allowNether: true,
  levelName: 'world',
  enableQuery: false,
  allowFlight: false,
  announcePlayerAchievements: true,
  serverPort: 25565,
  maxWorldSize: 29999984,
  levelType: 'DEFAULT',
  enableRcon: false,
  levelSeed: '',
  forceGamemode: false,
  serverIp: '',
  networkCompressionThreshold: 256,
  maxBuildHeight: 256,
  spawnNpcs: true,
  whiteList: false,
  spawnAnimals: true,
  hardcore: false,
  snooperEnabled: true,
  resourcePackSha1: '',
  onlineMode: true,
  resourcePack: '',
  pvp: true,
  difficulty: 1,
  enableCommandBlock: false,
  gamemode: 0,
  playerIdleTimeout: 0,
  maxPlayers: 20,
  maxTickTime: 60000,
  spawnMonsters: true,
  generateStructures: true,
  viewDistance: 10,
  motd: 'A Minecraft Server',
};

function camelCaseToHyphenated(str: string): string {
  return str.replace(/[A-Z]/, x => '-' + x.toLowerCase());
}

export function exportServerProperties(properties: ServerProperties): string {
  const lines = Object.keys(properties).map(key => {
    const hyphenated = camelCaseToHyphenated(key);
    return `${ hyphenated }: ${ properties[key] }`;
  });
  return lines.join('\n');
}
