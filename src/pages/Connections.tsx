import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Connection {
  id: string;
  name: string;
  type: 'postgresql' | 'mysql' | 'mongodb';
  host: string;
  port: number;
  database: string;
  status: 'connected' | 'disconnected';
}

const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Production DB',
    type: 'postgresql',
    host: 'prod.example.com',
    port: 5432,
    database: 'main_db',
    status: 'connected'
  },
  {
    id: '2',
    name: 'Development DB',
    type: 'mysql',
    host: 'dev.example.com',
    port: 3306,
    database: 'dev_db',
    status: 'disconnected'
  },
  {
    id: '3',
    name: 'Analytics MongoDB',
    type: 'mongodb',
    host: 'analytics.example.com',
    port: 27017,
    database: 'analytics',
    status: 'connected'
  }
];

const getDbIcon = (type: string) => {
  switch (type) {
    case 'postgresql':
      return 'Database';
    case 'mysql':
      return 'Database';
    case 'mongodb':
      return 'Database';
    default:
      return 'Database';
  }
};

export default function Connections() {
  const [connections] = useState<Connection[]>(mockConnections);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-xl font-medium text-foreground">
            Connections
          </h1>
        </div>

        <div className="mb-6 flex justify-end animate-fade-in" style={{ animationDelay: '100ms' }}>
          <Button size="sm" className="gap-1.5 ripple text-xs h-8 px-3">
            <Icon name="Plus" size={14} />
            New Connection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((conn, idx) => (
            <Card
              key={conn.id}
              className="bg-card border border-border hover:border-border/80 transition-all duration-150 minimal-shadow hover:bg-card/80 animate-scale-in cursor-pointer group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-primary/10 rounded group-hover:bg-primary/15 transition-colors">
                      <Icon name={getDbIcon(conn.type)} size={16} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium mb-0">{conn.name}</CardTitle>
                      <CardDescription className="uppercase text-xs tracking-wide mt-0.5">
                        {conn.type}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={conn.status === 'connected' ? 'default' : 'secondary'}
                    className="gap-1"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        conn.status === 'connected' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    />
                    {conn.status === 'connected' ? 'Активно' : 'Отключено'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Icon name="Server" size={12} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Host:</span>
                    <span className="font-medium text-foreground">{conn.host}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Icon name="Network" size={12} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Port:</span>
                    <span className="font-medium text-foreground">{conn.port}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Icon name="HardDrive" size={12} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Database:</span>
                    <span className="font-medium text-foreground">{conn.database}</span>
                  </div>
                </div>

                <div className="flex gap-1.5 mt-3">
                  <Button variant="outline" size="sm" className="flex-1 gap-1.5 ripple text-xs h-7">
                    <Icon name="Play" size={12} />
                    Connect
                  </Button>
                  <Button variant="outline" size="sm" className="ripple h-7 w-7 p-0">
                    <Icon name="Settings" size={12} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}