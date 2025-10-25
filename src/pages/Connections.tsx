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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-heading font-bold mb-2 text-foreground">
            Подключения к БД
          </h1>
          <p className="text-muted-foreground text-lg">
            Управляйте сохранёнными подключениями к базам данных
          </p>
        </div>

        <div className="mb-6 flex justify-end animate-fade-in" style={{ animationDelay: '100ms' }}>
          <Button className="gap-2 hover-scale">
            <Icon name="Plus" size={20} />
            Добавить подключение
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((conn, idx) => (
            <Card
              key={conn.id}
              className="glass-effect border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl animate-scale-in cursor-pointer group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Icon name={getDbIcon(conn.type)} size={24} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-1">{conn.name}</CardTitle>
                      <CardDescription className="uppercase text-xs font-medium">
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
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Server" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Хост:</span>
                    <span className="font-medium text-foreground">{conn.host}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Network" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Порт:</span>
                    <span className="font-medium text-foreground">{conn.port}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="HardDrive" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">База:</span>
                    <span className="font-medium text-foreground">{conn.database}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Icon name="Play" size={16} />
                    Подключиться
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Icon name="Settings" size={16} />
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
