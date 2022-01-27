import {
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnectionManager,
  getConnectionOptions,
} from "typeorm";

class Connection {
  private connectionOptions: ConnectionOptions;
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  async create() {
    await this.prepareConnection();

    await createConnection(this.connectionOptions);
  }

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
}

export { Connection };
