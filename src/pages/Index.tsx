import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const initialConnections: Connection[] = [
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
  }
];

export default function Index() {
  const navigate = useNavigate();
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [open, setOpen] = useState(false);
  const [newConnection, setNewConnection] = useState({
    name: '',
    type: 'postgresql' as const,
    host: '',
    port: 5432,
    database: ''
  });

  const handleAddConnection = () => {
    const connection: Connection = {
      id: Date.now().toString(),
      ...newConnection,
      status: 'disconnected'
    };
    setConnections([...connections, connection]);
    setNewConnection({ name: '', type: 'postgresql', host: '', port: 5432, database: '' });
    setOpen(false);
  };

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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-medium mb-1 text-foreground">
              DB Manager
            </h1>
            <p className="text-sm text-muted-foreground">
              Управление подключениями к базам данных
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 hover-scale shadow-lg">
                <Icon name="Plus" size={20} />
                Новое подключение
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Добавить подключение</DialogTitle>
                <DialogDescription>
                  Заполните данные для нового подключения к базе данных
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Название</Label>
                  <Input
                    id="name"
                    placeholder="Production DB"
                    value={newConnection.name}
                    onChange={(e) => setNewConnection({ ...newConnection, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Тип базы данных</Label>
                  <Select
                    value={newConnection.type}
                    onValueChange={(value: 'postgresql' | 'mysql' | 'mongodb') => {
                      const defaultPorts = { postgresql: 5432, mysql: 3306, mongodb: 27017 };
                      setNewConnection({ ...newConnection, type: value, port: defaultPorts[value] });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="host">Хост</Label>
                  <Input
                    id="host"
                    placeholder="localhost или prod.example.com"
                    value={newConnection.host}
                    onChange={(e) => setNewConnection({ ...newConnection, host: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="port">Порт</Label>
                  <Input
                    id="port"
                    type="number"
                    value={newConnection.port}
                    onChange={(e) => setNewConnection({ ...newConnection, port: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="database">База данных</Label>
                  <Input
                    id="database"
                    placeholder="main_db"
                    value={newConnection.database}
                    onChange={(e) => setNewConnection({ ...newConnection, database: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddConnection} className="w-full gap-2 mt-6">
                  <Icon name="Plus" size={18} />
                  Добавить подключение
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((conn, idx) => (
            <Card
              key={conn.id}
              onClick={() => navigate('/database')}
              className="bg-card border border-border hover:border-primary/50 transition-all duration-200 material-shadow hover:material-shadow-lg animate-scale-in cursor-pointer group"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon name={getDbIcon(conn.type)} size={20} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-medium mb-0.5">{conn.name}</CardTitle>
                      <p className="text-xs text-muted-foreground uppercase font-medium">
                        {conn.type}
                      </p>
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
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Server" size={14} />
                    <span className="truncate">{conn.host}:{conn.port}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="HardDrive" size={14} />
                    <span className="truncate">{conn.database}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Icon name="Play" size={14} />
                    Подключиться
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Icon name="Settings" size={14} />
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