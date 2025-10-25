import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Column {
  name: string;
  type: string;
  nullable: boolean;
  primary: boolean;
}

interface Table {
  name: string;
  rowCount: number;
  columns: Column[];
}

const mockTables: Table[] = [
  {
    name: 'users',
    rowCount: 12453,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primary: true },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, primary: false },
      { name: 'username', type: 'VARCHAR(100)', nullable: false, primary: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primary: false },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, primary: false }
    ]
  },
  {
    name: 'products',
    rowCount: 8924,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primary: true },
      { name: 'title', type: 'VARCHAR(255)', nullable: false, primary: false },
      { name: 'price', type: 'DECIMAL(10,2)', nullable: false, primary: false },
      { name: 'stock', type: 'INTEGER', nullable: false, primary: false },
      { name: 'category_id', type: 'INTEGER', nullable: true, primary: false }
    ]
  },
  {
    name: 'orders',
    rowCount: 34521,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primary: true },
      { name: 'user_id', type: 'INTEGER', nullable: false, primary: false },
      { name: 'total', type: 'DECIMAL(10,2)', nullable: false, primary: false },
      { name: 'status', type: 'VARCHAR(50)', nullable: false, primary: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primary: false }
    ]
  }
];

export default function Database() {
  const [tables] = useState<Table[]>(mockTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-primary/10 rounded">
              <Icon name="Database" size={16} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-medium text-foreground">
                Database Structure
              </h1>
              <p className="text-muted-foreground text-xs">
                Production DB • main_db
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-card border border-border minimal-shadow lg:col-span-1 animate-scale-in">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <Icon name="Table" size={14} />
                Tables ({tables.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="px-6 pb-4 space-y-2">
                  {tables.map((table, idx) => (
                    <div
                      key={table.name}
                      onClick={() => setSelectedTable(table)}
                      className={`p-2.5 rounded cursor-pointer transition-all duration-150 animate-fade-in ${
                        selectedTable?.name === table.name
                          ? 'bg-primary/10 border border-primary'
                          : 'bg-muted/20 hover:bg-muted/30'
                      }`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <Icon name="Table2" size={12} className="text-primary" />
                          <span className="font-medium text-xs">{table.name}</span>
                        </div>
                        <Icon name="ChevronRight" size={12} className="text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon name="Hash" size={10} />
                        <span>{table.rowCount.toLocaleString()} rows</span>
                        <span>•</span>
                        <span>{table.columns.length} cols</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border minimal-shadow lg:col-span-2 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <Icon name="Columns3" size={14} />
                {selectedTable ? `Table: ${selectedTable.name}` : 'Select a table'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTable ? (
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-4 px-3 py-2 bg-muted/30 rounded font-medium text-xs">
                      <div>Name</div>
                      <div>Type</div>
                      <div>Nullable</div>
                      <div>Key</div>
                    </div>
                    
                    {selectedTable.columns.map((column, idx) => (
                      <div
                        key={column.name}
                        className="grid grid-cols-4 gap-4 px-3 py-2 bg-muted/10 border border-border rounded hover:border-border/80 transition-all animate-fade-in"
                        style={{ animationDelay: `${idx * 30}ms` }}
                      >
                        <div className="flex items-center gap-1.5">
                          <Icon name="Columns2" size={11} className="text-muted-foreground" />
                          <span className="font-medium text-xs">{column.name}</span>
                        </div>
                        <div>
                          <Badge variant="outline" className="font-mono text-xs">
                            {column.type}
                          </Badge>
                        </div>
                        <div>
                          {column.nullable ? (
                            <Badge variant="secondary" className="gap-1">
                              <Icon name="Check" size={12} />
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1">
                              <Icon name="X" size={12} />
                              No
                            </Badge>
                          )}
                        </div>
                        <div>
                          {column.primary && (
                            <Badge className="gap-1 bg-primary">
                              <Icon name="Key" size={12} />
                              PRIMARY
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                    <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Info" size={18} />
                      Информация о таблице
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Всего строк:</span>
                        <span className="ml-2 font-semibold">{selectedTable.rowCount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Всего столбцов:</span>
                        <span className="ml-2 font-semibold">{selectedTable.columns.length}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Первичных ключей:</span>
                        <span className="ml-2 font-semibold">
                          {selectedTable.columns.filter(c => c.primary).length}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Nullable полей:</span>
                        <span className="ml-2 font-semibold">
                          {selectedTable.columns.filter(c => c.nullable).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              ) : (
                <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Icon name="MousePointerClick" size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Выберите таблицу из списка слева</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}