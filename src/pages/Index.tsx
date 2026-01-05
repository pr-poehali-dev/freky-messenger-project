import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [verificationStep, setVerificationStep] = useState<'phone' | 'sms' | 'password'>('phone');
  const [smsCode, setSmsCode] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'Пользователь',
    avatar: '👤',
    emojiStatus: '🚀',
    phone: ''
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--freky-purple))] via-[hsl(var(--freky-pink))] to-[hsl(var(--freky-orange))] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-card/95 backdrop-blur-xl border-primary/20 shadow-2xl animate-scale-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary mb-4 shadow-lg">
              <span className="text-4xl">💬</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Freky
            </h1>
            <p className="text-muted-foreground mt-2">Новая эра общения</p>
          </div>

          <div className="space-y-4">
            {verificationStep === 'phone' && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Номер телефона</label>
                  <Input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-muted/50 border-primary/20 focus:border-primary"
                  />
                </div>
                <Button
                  onClick={() => {
                    setUserProfile({ ...userProfile, phone: phoneNumber });
                    setVerificationStep('sms');
                  }}
                  className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all shadow-lg hover:shadow-xl text-lg py-6"
                >
                  Получить SMS-код
                </Button>
              </>
            )}

            {verificationStep === 'sms' && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Введите код из SMS</label>
                  <Input
                    type="text"
                    placeholder="000000"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    className="bg-muted/50 border-primary/20 focus:border-primary text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground mt-2">Код отправлен на {phoneNumber}</p>
                </div>
                <Button
                  onClick={() => setVerificationStep('password')}
                  className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all shadow-lg hover:shadow-xl text-lg py-6"
                >
                  Подтвердить
                </Button>
                <Button variant="ghost" onClick={() => setVerificationStep('phone')} className="w-full">
                  Изменить номер
                </Button>
              </>
            )}

            {verificationStep === 'password' && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Создайте пароль</label>
                  <Input
                    type="password"
                    placeholder="Придумайте надёжный пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-muted/50 border-primary/20 focus:border-primary"
                  />
                </div>
                <Button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all shadow-lg hover:shadow-xl text-lg py-6"
                >
                  Войти в Freky
                </Button>
              </>
            )}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>🎉 Бесплатный FrekyPremium для всех</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <aside className="w-20 bg-card border-r border-border flex flex-col items-center py-6 space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
          <span className="text-2xl">💬</span>
        </div>
        
        <Separator className="w-8" />
        
        <nav className="flex-1 flex flex-col space-y-4">
          {[
            { id: 'chats', icon: 'MessageCircle', label: 'Чаты' },
            { id: 'calls', icon: 'Phone', label: 'Звонки' },
            { id: 'contacts', icon: 'Users', label: 'Контакты' },
            { id: 'stickers', icon: 'Smile', label: 'Стикеры' },
            { id: 'crypto', icon: 'TrendingUp', label: 'Крипто' },
            { id: 'channel', icon: 'Radio', label: 'Канал' },
            { id: 'business', icon: 'Briefcase', label: 'Бизнес' },
            { id: 'profile', icon: 'User', label: 'Профиль' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${
                activeTab === item.id
                  ? 'bg-gradient-to-br from-primary to-secondary shadow-lg'
                  : 'hover:bg-muted'
              }`}
              title={item.label}
            >
              <Icon name={item.icon} size={20} className={activeTab === item.id ? 'text-white' : 'text-muted-foreground'} />
            </button>
          ))}
        </nav>

        <button onClick={() => setActiveTab('settings')} className="w-12 h-12 rounded-xl hover:bg-muted flex items-center justify-center transition-all hover:scale-110">
          <Icon name="Settings" size={20} className="text-muted-foreground" />
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        {activeTab === 'chats' && <ChatsView />}
        {activeTab === 'calls' && <CallsView />}
        {activeTab === 'contacts' && <ContactsView />}
        {activeTab === 'stickers' && <StickersView />}
        {activeTab === 'crypto' && <CryptoView />}
        {activeTab === 'channel' && <ChannelView />}
        {activeTab === 'business' && <BusinessView />}
        {activeTab === 'profile' && <ProfileView userProfile={userProfile} setUserProfile={setUserProfile} />}
        {activeTab === 'settings' && <SettingsView />}
      </div>
    </div>
  );
};

const ChatsView = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const [newChatType, setNewChatType] = useState<'personal' | 'group' | 'secret'>('personal');
  const [chats] = useState([
    { id: 1, name: 'Секретный чат', lastMessage: '🔒 Конфиденциальное сообщение', time: '15:20', unread: 1, avatar: '🔒', online: true, type: 'secret' },
    { id: 2, name: 'Группа друзей', lastMessage: 'Алекс: Встречаемся завтра!', time: '14:45', unread: 3, avatar: '👥', online: false, type: 'group', members: 12 },
  ]);

  return (
    <div className="flex h-full">
      <div className="w-96 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Чаты</h2>
            <Button size="icon" className="bg-gradient-to-r from-primary to-secondary" onClick={() => setShowNewChatDialog(true)}>
              <Icon name="Plus" size={20} />
            </Button>
          </div>
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Поиск чатов..." className="pl-10 bg-muted/50" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 hover:bg-muted/50 cursor-pointer transition-all border-b border-border/50 animate-fade-in ${
                selectedChat === chat.id ? 'bg-muted/70' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-2xl">{chat.avatar}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse-glow" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{chat.name}</h3>
                      {chat.type === 'group' && <Badge variant="outline" className="text-xs">{chat.members}</Badge>}
                    </div>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge className="ml-2 bg-gradient-to-r from-primary to-secondary">{chat.unread}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {showNewChatDialog && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <Card className="w-full max-w-md p-6 m-4">
            <h3 className="text-xl font-bold mb-4">Создать чат</h3>
            <div className="space-y-3 mb-6">
              <Button
                variant={newChatType === 'personal' ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setNewChatType('personal')}
              >
                <Icon name="User" size={20} className="mr-2" />
                Личный чат
              </Button>
              <Button
                variant={newChatType === 'group' ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setNewChatType('group')}
              >
                <Icon name="Users" size={20} className="mr-2" />
                Групповой чат
              </Button>
              <Button
                variant={newChatType === 'secret' ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setNewChatType('secret')}
              >
                <Icon name="Lock" size={20} className="mr-2" />
                Секретный чат 🔒
              </Button>
            </div>
            <div className="space-y-3">
              <Input placeholder={newChatType === 'group' ? 'Название группы' : 'Номер телефона'} />
              {newChatType === 'group' && (
                <Input placeholder="Добавить участников..." />
              )}
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-primary to-secondary" onClick={() => setShowNewChatDialog(false)}>
                  Создать
                </Button>
                <Button variant="outline" onClick={() => setShowNewChatDialog(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {selectedChat ? (
        <ChatWindow chat={chats.find((c) => c.id === selectedChat)!} onClose={() => setSelectedChat(null)} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageCircle" size={48} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Выберите чат</h3>
            <p className="text-muted-foreground">Начните общение с друзьями</p>
          </div>
        </div>
      )}
    </div>
  );
};

const CallsView = () => {
  const [activeCall, setActiveCall] = useState<{ name: string; avatar: string; type: string } | null>(null);
  const calls = [
    { id: 1, name: 'Александр', type: 'video', time: '14:32, Сегодня', duration: '12:34', avatar: '👨‍💼', missed: false },
    { id: 2, name: 'Мария', type: 'audio', time: '10:15, Сегодня', duration: '5:21', avatar: '👩‍🦰', missed: false },
    { id: 3, name: 'Иван', type: 'video', time: 'Вчера', duration: '—', avatar: '👨', missed: true },
  ];

  const startCall = (call: { name: string; avatar: string; type: string }) => {
    setActiveCall(call);
  };

  if (activeCall) {
    return <VideoCallWindow call={activeCall} onEndCall={() => setActiveCall(null)} />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Звонки</h2>
          <Button className="bg-gradient-to-r from-primary to-secondary">
            <Icon name="Phone" size={18} className="mr-2" />
            Новый звонок
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {calls.map((call) => (
            <Card key={call.id} className="p-4 hover:bg-muted/50 transition-all cursor-pointer animate-fade-in">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="text-2xl">{call.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{call.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name={call.type === 'video' ? 'Video' : 'Phone'} size={14} className={call.missed ? 'text-destructive' : 'text-green-500'} />
                    <span>{call.time}</span>
                    {call.duration !== '—' && <span>• {call.duration}</span>}
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="hover:bg-primary/20" onClick={() => startCall({ name: call.name, avatar: call.avatar, type: call.type })}>
                  <Icon name="Phone" size={20} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const ContactsView = () => {
  const [contacts] = useState<Array<{ id: number; name: string; phone: string; avatar: string }>>([]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Контакты</h2>
          <Button className="bg-gradient-to-r from-primary to-secondary">
            <Icon name="UserPlus" size={18} className="mr-2" />
            Добавить
          </Button>
        </div>
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Поиск по номеру телефона..." className="pl-10 bg-muted/50" />
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {contacts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center animate-fade-in">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={48} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Контактов пока нет</h3>
              <p className="text-muted-foreground mb-4">Добавьте контакты по номеру телефона</p>
              <Button className="bg-gradient-to-r from-primary to-secondary">
                <Icon name="UserPlus" size={18} className="mr-2" />
                Добавить контакт
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-3">
            {contacts.map((contact) => (
              <Card key={contact.id} className="p-4 hover:bg-muted/50 transition-all cursor-pointer animate-fade-in">
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="text-2xl">{contact.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="hover:bg-primary/20">
                      <Icon name="MessageCircle" size={20} />
                    </Button>
                    <Button size="icon" variant="ghost" className="hover:bg-secondary/20">
                      <Icon name="Phone" size={20} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

const StickersView = () => {
  const stickerPacks = [
    { id: 1, name: 'Эмоции', stickers: ['😀', '😂', '🥰', '😎', '🤩', '😍', '🤗', '🥳'] },
    { id: 2, name: 'Животные', stickers: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'] },
    { id: 3, name: 'Жесты', stickers: ['👍', '👎', '👌', '✌️', '🤟', '👏', '🙌', '🤝'] },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Стикеры</h2>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {stickerPacks.map((pack) => (
            <div key={pack.id} className="animate-fade-in">
              <h3 className="text-lg font-semibold mb-3">{pack.name}</h3>
              <div className="grid grid-cols-8 gap-3">
                {pack.stickers.map((sticker, idx) => (
                  <button
                    key={idx}
                    className="aspect-square rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center text-4xl hover:scale-110 transition-all"
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const CryptoView = () => {
  const [balance] = useState(1250);
  const [ycoinPrice] = useState(0.5);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Крипто-биржа</h2>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Мой кошелёк</p>
                <h3 className="text-3xl font-bold">{balance} Ycoin</h3>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-3xl">💎</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
                <Icon name="Plus" size={18} className="mr-2" />
                Купить
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="Send" size={18} className="mr-2" />
                Отправить
              </Button>
            </div>
          </Card>

          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Торговля Ycoin</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div>
                  <p className="text-sm text-muted-foreground">Курс</p>
                  <p className="text-xl font-semibold">50₽ = 100 Ycoin</p>
                </div>
                <Badge className="bg-green-500">+12%</Badge>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Сумма покупки (₽)</label>
                <Input type="number" placeholder="500" className="bg-muted/50" />
              </div>
              <Button className="w-full bg-gradient-to-r from-accent to-secondary">
                Купить Ycoin
              </Button>
            </div>
          </Card>

          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Аналитика</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">Всего транзакций</span>
                <span className="font-semibold">42</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">Средний чек</span>
                <span className="font-semibold">250₽</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">Прибыль</span>
                <span className="font-semibold text-green-500">+3,200₽</span>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

const ChannelView = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [channelAdmins, setChannelAdmins] = useState([
    { id: 1, name: 'Создатель Freky', phone: '+7 999 100-00-00', role: 'owner', avatar: '👑' }
  ]);
  const news = [
    { id: 1, title: 'Обновление 2.0 уже здесь! 🚀', content: 'Добавлены новые функции: групповые видеозвонки до 50 человек, улучшенная криптобиржа и новые стикер-паки!', time: '2 часа назад' },
    { id: 2, title: 'FrekyPremium бесплатно навсегда! 🎉', content: 'Мы решили сделать все премиум-функции доступными для всех пользователей без ограничений.', time: '1 день назад' },
    { id: 3, title: 'Новая валюта Ycoin запущена 💎', content: 'Теперь вы можете покупать, продавать и обменивать Ycoin прямо в приложении. Курс: 50₽ = 100 Ycoin.', time: '3 дня назад' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Radio" size={24} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">Freky News</h2>
                <Badge className="bg-gradient-to-r from-primary to-secondary">
                  <Icon name="CheckCircle" size={14} className="mr-1" />
                  Официальный
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Новости и обновления</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setShowAdminPanel(!showAdminPanel)}>
            <Icon name="Shield" size={18} className="mr-2" />
            Администраторы
          </Button>
        </div>
      </div>

      {showAdminPanel && (
        <div className="border-b border-border bg-muted/30 p-4 animate-fade-in">
          <h3 className="font-semibold mb-3">Администраторы канала</h3>
          <div className="space-y-2 mb-4">
            {channelAdmins.map((admin) => (
              <div key={admin.id} className="flex items-center gap-3 p-2 rounded-lg bg-card">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-xl">{admin.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{admin.name}</p>
                  <p className="text-xs text-muted-foreground">{admin.phone}</p>
                </div>
                <Badge variant={admin.role === 'owner' ? 'default' : 'secondary'}>
                  {admin.role === 'owner' ? 'Владелец' : 'Админ'}
                </Badge>
              </div>
            ))}
          </div>
          <Input placeholder="Введите номер телефона нового админа" className="mb-2" />
          <Button className="w-full bg-gradient-to-r from-primary to-secondary" onClick={() => {
            setChannelAdmins([...channelAdmins, {
              id: channelAdmins.length + 1,
              name: 'Новый админ',
              phone: '+7 999 000-00-00',
              role: 'admin',
              avatar: '👤'
            }]);
          }}>
            <Icon name="UserPlus" size={18} className="mr-2" />
            Добавить администратора
          </Button>
        </div>
      )}

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {news.map((item) => (
            <Card key={item.id} className="p-5 hover:bg-muted/50 transition-all cursor-pointer animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Megaphone" size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-3">{item.content}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface VideoCallWindowProps {
  call: { name: string; avatar: string; type: string };
  onEndCall: () => void;
}

const VideoCallWindow = ({ call, onEndCall }: VideoCallWindowProps) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col relative bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse-glow">
            <span className="text-7xl">{call.avatar}</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">{call.name}</h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
            <Icon name={call.type === 'video' ? 'Video' : 'Phone'} size={20} />
            <span className="text-lg">{call.type === 'video' ? 'Видеозвонок' : 'Аудиозвонок'}</span>
          </div>
          <p className="text-xl text-primary font-mono">{formatTime(callDuration)}</p>
        </div>
      </div>

      {call.type === 'video' && !isVideoOff && (
        <div className="absolute top-4 right-4 w-48 h-36 rounded-2xl bg-muted/80 backdrop-blur-xl border-2 border-primary/30 shadow-xl overflow-hidden animate-fade-in">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-background">
            <span className="text-5xl">👤</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 animate-fade-in">
        <Button
          size="icon"
          variant="outline"
          className={`w-16 h-16 rounded-full ${isMuted ? 'bg-destructive/20' : 'bg-card/80 backdrop-blur'}`}
          onClick={() => setIsMuted(!isMuted)}
        >
          <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} />
        </Button>

        {call.type === 'video' && (
          <Button
            size="icon"
            variant="outline"
            className={`w-16 h-16 rounded-full ${isVideoOff ? 'bg-destructive/20' : 'bg-card/80 backdrop-blur'}`}
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            <Icon name={isVideoOff ? 'VideoOff' : 'Video'} size={24} />
          </Button>
        )}

        <Button
          size="icon"
          className="w-16 h-16 rounded-full bg-destructive hover:bg-destructive/90"
          onClick={onEndCall}
        >
          <Icon name="PhoneOff" size={24} />
        </Button>
      </div>
    </div>
  );
};

interface ChatWindowProps {
  chat: { id: number; name: string; avatar: string; online: boolean };
  onClose: () => void;
}

const ChatWindow = ({ chat, onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Привет! Как дела?', sender: 'other', time: '14:30' },
    { id: 2, text: 'Отлично! А у тебя?', sender: 'me', time: '14:31' },
    { id: 3, text: 'Всё хорошо, спасибо 😊', sender: 'other', time: '14:32' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showStickers, setShowStickers] = useState(false);

  const stickerPacks = [
    ['😀', '😂', '🥰', '😎', '🤩', '😍', '🤗', '🥳'],
    ['👍', '👎', '👌', '✌️', '🤟', '👏', '🙌', '🤝'],
    ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓'],
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  const handleSendSticker = (sticker: string) => {
    setMessages([...messages, {
      id: messages.length + 1,
      text: sticker,
      sender: 'me',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }]);
    setShowStickers(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between bg-card">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="text-2xl">{chat.avatar}</AvatarFallback>
            </Avatar>
            {chat.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{chat.name}</h3>
            <p className="text-xs text-muted-foreground">{chat.online ? 'В сети' : 'Не в сети'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" className="hover:bg-primary/20" title="Переводчик">
            <Icon name="Languages" size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="hover:bg-primary/20">
            <Icon name="Phone" size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="hover:bg-secondary/20">
            <Icon name="Video" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-2xl ${
                  msg.sender === 'me'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-card'
                }`}
              >
                <p className={msg.text.length < 5 ? 'text-4xl' : ''}>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {showStickers && (
        <div className="border-t border-border bg-card p-4 animate-fade-in">
          <div className="space-y-3 max-w-4xl mx-auto">
            {stickerPacks.map((pack, packIdx) => (
              <div key={packIdx} className="flex gap-2 justify-center">
                {pack.map((sticker, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendSticker(sticker)}
                    className="w-14 h-14 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center text-3xl hover:scale-110 transition-all"
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowStickers(!showStickers)}
            className={showStickers ? 'bg-primary/20' : ''}
          >
            <Icon name="Smile" size={20} />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Написать сообщение..."
            className="flex-1 bg-muted/50"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-primary to-secondary"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ProfileViewProps {
  userProfile: { name: string; avatar: string; emojiStatus: string; phone: string };
  setUserProfile: (profile: { name: string; avatar: string; emojiStatus: string; phone: string }) => void;
}

const ProfileView = ({ userProfile, setUserProfile }: ProfileViewProps) => {
  const [editName, setEditName] = useState(userProfile.name);
  const [selectedEmoji, setSelectedEmoji] = useState(userProfile.emojiStatus);
  const emojiOptions = ['🚀', '💎', '🔥', '⚡', '✨', '🎨', '🎮', '🎵', '💼', '🏆'];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Профиль</h2>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center gap-6">
              <div className="relative group cursor-pointer">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-secondary">{userProfile.avatar}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 text-3xl">{userProfile.emojiStatus}</div>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="Camera" size={24} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1">{userProfile.name}</h3>
                <p className="text-muted-foreground">{userProfile.phone}</p>
                <Badge className="mt-2 bg-gradient-to-r from-primary to-secondary">
                  FrekyPremium
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Настройки профиля</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Имя пользователя</label>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="bg-muted/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Emoji статус</label>
                <div className="grid grid-cols-5 gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`aspect-square rounded-xl flex items-center justify-center text-3xl transition-all ${
                        selectedEmoji === emoji
                          ? 'bg-gradient-to-br from-primary to-secondary scale-110'
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Выбрать фото профиля (эмодзи)</label>
                <div className="grid grid-cols-5 gap-2">
                  {['👤', '👨‍💼', '👩‍🦰', '🦸', '🧑‍💻', '👨‍🎨', '👩‍🚀', '🤖', '👾', '🎭'].map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setUserProfile({ ...userProfile, avatar })}
                      className={`aspect-square rounded-xl flex items-center justify-center text-3xl transition-all ${
                        userProfile.avatar === avatar
                          ? 'bg-gradient-to-br from-primary to-secondary scale-110'
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary"
                onClick={() => setUserProfile({ ...userProfile, name: editName, emojiStatus: selectedEmoji })}
              >
                Сохранить изменения
              </Button>
            </div>
          </Card>

          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Тема оформления</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Фиолетовая', gradient: 'from-purple-500 to-pink-500' },
                { name: 'Синяя', gradient: 'from-blue-500 to-cyan-500' },
                { name: 'Зелёная', gradient: 'from-green-500 to-emerald-500' },
              ].map((theme) => (
                <button
                  key={theme.name}
                  className={`aspect-square rounded-xl bg-gradient-to-br ${theme.gradient} hover:scale-105 transition-all shadow-lg`}
                >
                  <span className="text-white font-medium text-sm">{theme.name}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

const SettingsView = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Настройки</h2>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Уведомления</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Звук сообщений</p>
                  <p className="text-sm text-muted-foreground">Воспроизводить звук при получении</p>
                </div>
                <input type="checkbox" defaultChecked className="w-10 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Вибрация</p>
                  <p className="text-sm text-muted-foreground">Вибрировать при звонках</p>
                </div>
                <input type="checkbox" defaultChecked className="w-10 h-5" />
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Конфиденциальность</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span>Кто видит мой номер</span>
                <Icon name="ChevronRight" size={18} />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Кто видит мой статус</span>
                <Icon name="ChevronRight" size={18} />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Заблокированные пользователи</span>
                <Icon name="ChevronRight" size={18} />
              </Button>
            </div>
          </Card>

          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Автоматический перевод</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Включите автоперевод сообщений со всех языков
            </p>
            <div className="flex items-center justify-between">
              <span>Переводить сообщения</span>
              <input type="checkbox" defaultChecked className="w-10 h-5" />
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

const BusinessView = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <Icon name="Briefcase" size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Freky Бизнес</h2>
            <p className="text-sm text-muted-foreground">Инструменты для бизнеса</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          <Card className="p-6 animate-fade-in bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
            <h3 className="text-xl font-bold mb-2">Создайте бизнес-аккаунт</h3>
            <p className="text-muted-foreground mb-4">
              Получите доступ к аналитике, автоответчикам, массовым рассылкам и интеграциям
            </p>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Icon name="Sparkles" size={18} className="mr-2" />
              Создать бизнес-профиль
            </Button>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-5 animate-fade-in hover:bg-muted/50 transition-all cursor-pointer">
              <Icon name="BarChart3" size={32} className="text-primary mb-3" />
              <h3 className="font-semibold mb-2">Аналитика</h3>
              <p className="text-sm text-muted-foreground">Статистика сообщений, звонков и клиентов</p>
            </Card>

            <Card className="p-5 animate-fade-in hover:bg-muted/50 transition-all cursor-pointer">
              <Icon name="Bot" size={32} className="text-secondary mb-3" />
              <h3 className="font-semibold mb-2">Автоответчики</h3>
              <p className="text-sm text-muted-foreground">Настройте автоматические ответы</p>
            </Card>

            <Card className="p-5 animate-fade-in hover:bg-muted/50 transition-all cursor-pointer">
              <Icon name="Send" size={32} className="text-accent mb-3" />
              <h3 className="font-semibold mb-2">Рассылки</h3>
              <p className="text-sm text-muted-foreground">Массовые сообщения вашим клиентам</p>
            </Card>

            <Card className="p-5 animate-fade-in hover:bg-muted/50 transition-all cursor-pointer">
              <Icon name="Webhook" size={32} className="text-primary mb-3" />
              <h3 className="font-semibold mb-2">API & Интеграции</h3>
              <p className="text-sm text-muted-foreground">Подключите CRM и другие системы</p>
            </Card>
          </div>

          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Тарифы для бизнеса</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Стартовый</h4>
                  <Badge>Бесплатно</Badge>
                </div>
                <p className="text-sm text-muted-foreground">До 100 клиентов, базовая аналитика</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Профессиональный</h4>
                  <Badge className="bg-gradient-to-r from-primary to-secondary">2,999₽/мес</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Безлимит клиентов, полная аналитика, API</p>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Index;