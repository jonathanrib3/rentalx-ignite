import {
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnectionManager,
  getConnectionOptions,
} from "typeorm";

interface IOptions {
  database: string;
}

class Connection {
  private connectionOptions: ConnectionOptions | IOptions;
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  async create() {
    await this.prepareConnection();

    return createConnection(this.connectionOptions as ConnectionOptions);
  }

  /*
  .then((options) => {
      if (process.env.NODE_ENV === "test") {
        const newOptions = options as IOptions;
        newOptions.database = "rentx_test";
        return newOptions;
      }
      return options;
    })
  */

  private async prepareConnection() {
    this.connectionOptions = await getConnectionOptions();
  }

  status() {
    const hasDefaultConnection = this.connectionManager.has("default");
    const { isConnected } = this.getDefaultConnection();

    return (
      `Does default connection exists? - ${hasDefaultConnection}` +
      `\nIs default connection actually working? - ${isConnected}`
    );
  }

  getDefaultConnection() {
    return this.connectionManager.get("default");
  }

  async close() {
    await this.getDefaultConnection().close();
  }

  getOptions() {
    return this.connectionOptions;
  }
}

export { Connection };
