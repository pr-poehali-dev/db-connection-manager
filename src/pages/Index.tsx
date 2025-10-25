import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-6">
            <Icon name="Database" size={56} className="text-primary" />
          </div>
          <h1 className="text-5xl font-heading font-bold mb-4 text-foreground">
            DB Manager
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Управление подключениями к базам данных и визуализация структуры
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            onClick={() => navigate('/connections')}
            className="glass-effect border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl cursor-pointer group animate-scale-in"
          >
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Icon name="Network" size={32} className="text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-1">Подключения</CardTitle>
                  <CardDescription>Управление сохранёнными подключениями</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Просмотр и редактирование подключений к PostgreSQL, MySQL и MongoDB
              </p>
              <Button className="w-full gap-2 group-hover:shadow-lg transition-shadow">
                Открыть подключения
                <Icon name="ArrowRight" size={18} />
              </Button>
            </CardContent>
          </Card>

          <Card
            onClick={() => navigate('/database')}
            className="glass-effect border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl cursor-pointer group animate-scale-in"
            style={{ animationDelay: '100ms' }}
          >
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Icon name="Table" size={32} className="text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-1">База данных</CardTitle>
                  <CardDescription>Структура и содержимое таблиц</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Исследование структуры базы данных, просмотр таблиц и колонок
              </p>
              <Button className="w-full gap-2 group-hover:shadow-lg transition-shadow">
                Открыть базу данных
                <Icon name="ArrowRight" size={18} />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Icon name="Shield" size={16} />
            Все подключения защищены шифрованием
          </p>
        </div>
      </div>
    </div>
  );
}
