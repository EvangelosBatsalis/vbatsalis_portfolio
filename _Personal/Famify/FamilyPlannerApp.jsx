import React, { useState } from 'react';
import { 
  Calendar, CheckCircle, Circle, ShoppingBag, User, Home, ListTodo, 
  Bell, ChevronRight, Plus, DollarSign, Wallet, Users, LogOut,
  MapPin, Clock, Tag, School, Theater, Plane, Coffee, Heart,
  TrendingUp, PieChart, Receipt, ArrowRight, Check, X, Eye, EyeOff
} from 'lucide-react';

// Main App Component with Navigation
export default function FamilyPlannerApp() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = (screen) => {
    if (screen === 'login') {
      setIsLoggedIn(false);
      setCurrentScreen('login');
    } else {
      setCurrentScreen('main');
      setActiveTab(screen);
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => { setIsLoggedIn(true); navigate('home'); }} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-gray-900 relative">
        
        {/* Status Bar */}
        <StatusBar />

        {/* Screen Content */}
        <div className="flex-1 overflow-hidden" style={{ height: 'calc(100% - 44px)' }}>
          {activeTab === 'home' && <HomeScreen navigate={navigate} />}
          {activeTab === 'calendar' && <CalendarScreen />}
          {activeTab === 'tasks' && <TasksScreen />}
          {activeTab === 'shopping' && <ShoppingScreen />}
          {activeTab === 'obligations' && <ObligationsScreen />}
          {activeTab === 'money' && <MoneyScreen />}
          {activeTab === 'profile' && <ProfileScreen navigate={navigate} />}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

// Status Bar Component
function StatusBar() {
  return (
    <div className="h-11 bg-white flex items-center justify-between px-8 pt-2">
      <span className="text-sm font-semibold">9:41</span>
      <div className="flex gap-1 items-center">
        <div className="text-xs">📶</div>
        <div className="text-xs">📱</div>
        <div className="text-xs">🔋</div>
      </div>
    </div>
  );
}

// Login Screen
function LoginScreen({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-gray-900">
        <StatusBar />
        
        <div className="flex flex-col items-center justify-center h-full px-8">
          {/* Logo */}
          <div className="mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg mb-4">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 text-center">FamilyHub</h1>
            <p className="text-gray-500 text-center mt-2">Οργανώστε την οικογένειά σας</p>
          </div>

          {/* Login Form */}
          <div className="w-full space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="family@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none pr-12"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button className="text-sm text-indigo-600 font-medium">
              Ξέχασες το password;
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Σύνδεση
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Δεν έχεις λογαριασμό; <span className="text-indigo-600 font-semibold cursor-pointer">Εγγραφή</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Home Screen
function HomeScreen({ navigate }) {
  const familyMembers = [
    { name: 'Μαρία', tasks: 3, color: '#EC4899', completed: 2 },
    { name: 'Γιάννης', tasks: 4, color: '#3B82F6', completed: 1 },
    { name: 'Σοφία', tasks: 2, color: '#8B5CF6', completed: 2 },
    { name: 'Πέτρος', tasks: 5, color: '#F59E0B', completed: 3 }
  ];

  const todayEvents = [
    { time: '09:00', title: 'Γιατρός - Σοφία', type: 'medical', member: 'Σοφία' },
    { time: '15:00', title: 'Μπάσκετ - Γιάννης', type: 'sports', member: 'Γιάννης' },
    { time: '18:00', title: 'Σούπερ Μάρκετ', type: 'shopping', member: 'Μαρία' }
  ];

  const quickActions = [
    { icon: Plus, label: 'Νέο Task', color: 'bg-blue-500', action: () => navigate('tasks') },
    { icon: Calendar, label: 'Event', color: 'bg-purple-500', action: () => navigate('calendar') },
    { icon: ShoppingBag, label: 'Αγορά', color: 'bg-green-500', action: () => navigate('shopping') },
    { icon: DollarSign, label: 'Έξοδο', color: 'bg-orange-500', action: () => navigate('money') }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 pt-4 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-white/80 text-sm">Πέμπτη, 22 Ιανουαρίου</p>
            <h1 className="text-white text-2xl font-bold mt-1">Καλημέρα! 👋</h1>
          </div>
          <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
            <Bell className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <p className="text-white/80 text-xs">Σήμερα</p>
            <p className="text-white text-2xl font-bold">14</p>
            <p className="text-white/80 text-xs">tasks</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <p className="text-white/80 text-xs">Ολοκληρώθηκαν</p>
            <p className="text-white text-2xl font-bold">8</p>
            <p className="text-white/80 text-xs">από 14</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <p className="text-white/80 text-xs">Events</p>
            <p className="text-white text-2xl font-bold">3</p>
            <p className="text-white/80 text-xs">σήμερα</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        
        {/* Quick Actions */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Γρήγορες Ενέργειες</h2>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.action}
                className="flex flex-col items-center gap-2"
              >
                <div className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600 text-center">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Events */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-gray-900">📅 Σήμερα</h2>
            <button 
              onClick={() => navigate('calendar')}
              className="text-sm text-indigo-600 font-medium flex items-center gap-1"
            >
              Όλα <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {todayEvents.map((event, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 rounded-lg px-3 py-2 min-w-[60px] text-center">
                    <p className="text-indigo-600 font-bold text-sm">{event.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.member}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Family Members */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">👨‍👩‍👧‍👦 Οικογένεια</h2>
          <div className="grid grid-cols-2 gap-3">
            {familyMembers.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-white text-xl font-bold"
                  style={{ backgroundColor: member.color }}
                >
                  {member.name[0]}
                </div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{member.name}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${(member.completed / member.tasks) * 100}%`,
                        backgroundColor: member.color
                      }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {member.completed}/{member.tasks} tasks
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Calendar Screen
function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(22);
  
  const daysOfWeek = ['Δευ', 'Τρί', 'Τετ', 'Πέμ', 'Παρ', 'Σάβ', 'Κυρ'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const events = [
    { id: 1, time: '09:00', title: 'Γιατρός - Σοφία', category: 'medical', color: 'bg-red-500' },
    { id: 2, time: '10:30', title: 'Σχολείο - Συνάντηση γονέων', category: 'school', color: 'bg-blue-500' },
    { id: 3, time: '15:00', title: 'Μπάσκετ - Γιάννης', category: 'sports', color: 'bg-green-500' },
    { id: 4, time: '18:00', title: 'Θέατρο - Όλη η οικογένεια', category: 'entertainment', color: 'bg-purple-500' },
    { id: 5, time: '20:00', title: 'Δείπνο με φίλους', category: 'social', color: 'bg-orange-500' }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 pt-6 pb-4">
        <h1 className="text-white text-2xl font-bold mb-1">Ημερολόγιο</h1>
        <p className="text-white/80 text-sm">Ιανουάριος 2026</p>
      </div>

      {/* Mini Calendar */}
      <div className="bg-white px-4 py-4 border-b">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map((day, idx) => (
            <div key={idx} className="text-center text-xs font-semibold text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {dates.slice(0, 14).map((date, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDate(date)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
                ${selectedDate === date 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
                ${[5, 12].includes(date) ? 'relative after:absolute after:bottom-1 after:w-1 after:h-1 after:rounded-full after:bg-purple-500' : ''}
              `}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            {selectedDate} Ιανουαρίου
          </h2>
          <button className="bg-purple-600 text-white p-2 rounded-full">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className={`${event.color} w-1 h-14 rounded-full`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-600">{event.time}</span>
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">{event.title}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${event.color} bg-opacity-20`}>
                      {event.category}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Tasks Screen
function TasksScreen() {
  const [filter, setFilter] = useState('all');

  const tasks = [
    { id: 1, title: 'Πλυντήριο ρούχων', assignee: 'Μαρία', priority: 'high', completed: false, category: 'house' },
    { id: 2, title: 'Homework Μαθηματικά', assignee: 'Γιάννης', priority: 'high', completed: false, category: 'school' },
    { id: 3, title: 'Βόλτα με το σκύλο', assignee: 'Σοφία', priority: 'medium', completed: true, category: 'pets' },
    { id: 4, title: 'Καθαρισμός κουζίνας', assignee: 'Πέτρος', priority: 'medium', completed: false, category: 'house' },
    { id: 5, title: 'Αγορά γάλα', assignee: 'Μαρία', priority: 'low', completed: false, category: 'shopping' },
    { id: 6, title: 'Διάβασμα βιβλίου', assignee: 'Γιάννης', priority: 'low', completed: true, category: 'personal' }
  ];

  const filters = ['Όλα', 'Ενεργά', 'Ολοκληρωμένα', 'Υψηλής Προτ.'];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 pt-6 pb-4">
        <h1 className="text-white text-2xl font-bold mb-1">Εργασίες</h1>
        <p className="text-white/80 text-sm">{tasks.filter(t => !t.completed).length} ενεργές εργασίες</p>
      </div>

      {/* Filters */}
      <div className="bg-white px-6 py-4 border-b">
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((f, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${filter === f 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* High Priority Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Υψηλής Προτεραιότητας</h2>
          </div>
          <div className="space-y-2">
            {tasks.filter(t => t.priority === 'high' && !t.completed).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Other Tasks */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Άλλες Εργασίες</h2>
          </div>
          <div className="space-y-2">
            {tasks.filter(t => t.priority !== 'high' && !t.completed).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Completed */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Ολοκληρωμένες</h2>
          </div>
          <div className="space-y-2">
            {tasks.filter(t => t.completed).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="absolute bottom-24 right-8">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function TaskCard({ task }) {
  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-orange-200 bg-orange-50',
    low: 'border-gray-200 bg-white'
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border-2 ${priorityColors[task.priority]}`}>
      <button className="flex-shrink-0">
        {task.completed ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400" />
        )}
      </button>
      <div className="flex-1">
        <p className={`font-medium text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">{task.assignee}</p>
      </div>
      {task.priority === 'high' && !task.completed && (
        <span className="text-red-500 text-lg">🔥</span>
      )}
    </div>
  );
}

// Shopping Screen
function ShoppingScreen() {
  const lists = [
    {
      id: 1,
      name: 'Σούπερ Μάρκετ',
      items: [
        { name: 'Γάλα', checked: false, category: 'Γαλακτοκομικά' },
        { name: 'Ψωμί', checked: true, category: 'Αρτοποιείο' },
        { name: 'Τυρί Φέτα', checked: false, category: 'Γαλακτοκομικά' },
        { name: 'Ντομάτες', checked: false, category: 'Λαχανικά' },
        { name: 'Κρέας κιμάς', checked: false, category: 'Κρέας' }
      ]
    },
    {
      id: 2,
      name: 'Φαρμακείο',
      items: [
        { name: 'Ασπιρίνη', checked: false, category: 'Φάρμακα' },
        { name: 'Βιταμίνη D', checked: false, category: 'Συμπληρώματα' }
      ]
    },
    {
      id: 3,
      name: 'Είδη Σπιτιού',
      items: [
        { name: 'Απορρυπαντικό', checked: true, category: 'Καθαριότητα' },
        { name: 'Χαρτί υγείας', checked: false, category: 'Καθαριότητα' }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 pt-6 pb-4">
        <h1 className="text-white text-2xl font-bold mb-1">Λίστες Αγορών</h1>
        <p className="text-white/80 text-sm">3 ενεργές λίστες</p>
      </div>

      {/* Lists */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {lists.map((list) => {
            const checkedCount = list.items.filter(i => i.checked).length;
            const totalCount = list.items.length;
            const progress = (checkedCount / totalCount) * 100;

            return (
              <div key={list.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* List Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{list.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {checkedCount}/{totalCount} προϊόντα
                      </p>
                    </div>
                    <ShoppingBag className="w-5 h-5 text-green-600" />
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* List Items */}
                <div className="p-4 space-y-2">
                  {list.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <button>
                        {item.checked ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm ${item.checked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">{item.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Button */}
      <div className="absolute bottom-24 right-8">
        <button className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

// Obligations Screen
function ObligationsScreen() {
  const obligations = [
    {
      category: 'Σχολείο',
      icon: School,
      color: 'bg-blue-500',
      items: [
        { title: 'Συνάντηση γονέων', date: '25 Ιαν', time: '17:00', member: 'Γιάννης' },
        { title: 'Εκδρομή Μουσείο', date: '28 Ιαν', time: '09:00', member: 'Σοφία' }
      ]
    },
    {
      category: 'Θέατρο / Πολιτισμός',
      icon: Theater,
      color: 'bg-purple-500',
      items: [
        { title: 'Θεατρική Παράσταση', date: '22 Ιαν', time: '20:00', member: 'Όλοι' },
        { title: 'Συναυλία', date: '30 Ιαν', time: '21:00', member: 'Μαρία & Πέτρος' }
      ]
    },
    {
      category: 'Εκδρομές',
      icon: Plane,
      color: 'bg-green-500',
      items: [
        { title: 'Σαββατοκύριακο στα βουνά', date: '3-5 Φεβ', time: '', member: 'Όλοι' },
        { title: 'Επίσκεψη γιαγιά', date: '10 Φεβ', time: '11:00', member: 'Όλοι' }
      ]
    },
    {
      category: 'Δραστηριότητες',
      icon: Coffee,
      color: 'bg-orange-500',
      items: [
        { title: 'Μπάσκετ προπόνηση', date: 'Κάθε Τρ & Πέμ', time: '17:00', member: 'Γιάννης' },
        { title: 'Yoga μαθήματα', date: 'Κάθε Δευ', time: '18:30', member: 'Μαρία' }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 pt-6 pb-4">
        <h1 className="text-white text-2xl font-bold mb-1">Υποχρεώσεις</h1>
        <p className="text-white/80 text-sm">Σχολείο, δραστηριότητες & εκδρομές</p>
      </div>

      {/* Obligations List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          {obligations.map((obligation, idx) => (
            <div key={idx}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`${obligation.color} p-2 rounded-lg`}>
                  <obligation.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{obligation.category}</h2>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {obligation.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{item.date}</span>
                          </div>
                          {item.time && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{item.time}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{item.member}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Button */}
      <div className="absolute bottom-24 right-8">
        <button className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

// Money Split Screen
function MoneyScreen() {
  const [activeMoneyTab, setActiveMoneyTab] = useState('overview');

  const expenses = [
    { id: 1, title: 'Σούπερ Μάρκετ', amount: 85.50, paidBy: 'Μαρία', date: '22 Ιαν', category: 'Τρόφιμα', split: 4 },
    { id: 2, title: 'Ρεύμα ΔΕΗ', amount: 120.00, paidBy: 'Πέτρος', date: '20 Ιαν', category: 'Λογαριασμοί', split: 2 },
    { id: 3, title: 'Εστιατόριο', amount: 95.00, paidBy: 'Μαρία', date: '18 Ιαν', category: 'Εστίαση', split: 4 },
    { id: 4, title: 'Βενζίνη', amount: 60.00, paidBy: 'Πέτρος', date: '15 Ιαν', category: 'Μεταφορά', split: 2 }
  ];

  const balances = [
    { name: 'Μαρία', paid: 180.50, owes: 145.25, balance: 35.25, color: '#EC4899' },
    { name: 'Πέτρος', paid: 180.00, owes: 145.25, balance: 34.75, color: '#3B82F6' },
    { name: 'Γιάννης', paid: 0, owes: 45.13, balance: -45.13, color: '#8B5CF6' },
    { name: 'Σοφία', paid: 0, owes: 45.13, balance: -45.13, color: '#F59E0B' }
  ];

  const monthlyStats = {
    totalExpenses: 360.50,
    perPerson: 90.13,
    categories: [
      { name: 'Τρόφιμα', amount: 85.50, percent: 24 },
      { name: 'Λογαριασμοί', amount: 120.00, percent: 33 },
      { name: 'Εστίαση', amount: 95.00, percent: 26 },
      { name: 'Μεταφορά', amount: 60.00, percent: 17 }
    ]
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 pt-6 pb-4">
        <h1 className="text-white text-2xl font-bold mb-1">Οικονομικά</h1>
        <p className="text-white/80 text-sm">Money Split & Έξοδα</p>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 py-3 border-b flex gap-2">
        {['overview', 'expenses', 'balances'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveMoneyTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeMoneyTab === tab
                ? 'bg-emerald-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab === 'overview' ? 'Επισκόπηση' : tab === 'expenses' ? 'Έξοδα' : 'Ισοζύγια'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {activeMoneyTab === 'overview' && (
          <div className="space-y-6">
            {/* Monthly Summary */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
              <p className="text-white/80 text-sm mb-2">Σύνολο Ιανουαρίου</p>
              <p className="text-4xl font-bold mb-4">€{monthlyStats.totalExpenses.toFixed(2)}</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">Ανά άτομο: €{monthlyStats.perPerson.toFixed(2)}</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Κατηγορίες Εξόδων
              </h3>
              <div className="space-y-3">
                {monthlyStats.categories.map((cat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{cat.name}</span>
                      <span className="font-bold text-emerald-600">€{cat.amount.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${cat.percent}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{cat.percent}% του συνόλου</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Balances */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Γρήγορη Ματιά</h3>
              <div className="grid grid-cols-2 gap-3">
                {balances.map((person, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white rounded-xl p-4 shadow-sm border-2 ${
                      person.balance >= 0 ? 'border-green-200' : 'border-red-200'
                    }`}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-2 text-white font-bold"
                      style={{ backgroundColor: person.color }}
                    >
                      {person.name[0]}
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{person.name}</p>
                    <p className={`text-lg font-bold ${person.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {person.balance >= 0 ? '+' : ''}€{Math.abs(person.balance).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMoneyTab === 'expenses' && (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div key={expense.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{expense.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{expense.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">€{expense.amount.toFixed(2)}</p>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                      {expense.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Πλήρωσε: {expense.paidBy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Split: {expense.split} άτομα</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeMoneyTab === 'balances' && (
          <div className="space-y-4">
            {balances.map((person, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: person.color }}
                  >
                    {person.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{person.name}</p>
                    <p className={`text-lg font-bold ${person.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {person.balance >= 0 ? 'Τους χρωστάνε' : 'Χρωστάει'} €{Math.abs(person.balance).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Πλήρωσε</p>
                    <p className="text-lg font-semibold text-gray-900">€{person.paid.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Χρωστάει</p>
                    <p className="text-lg font-semibold text-gray-900">€{person.owes.toFixed(2)}</p>
                  </div>
                </div>

                {person.balance < 0 && (
                  <button className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    Εξόφληση
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Button */}
      <div className="absolute bottom-24 right-8">
        <button className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

// Profile Screen
function ProfileScreen({ navigate }) {
  const familyMembers = [
    { name: 'Μαρία Παπαδοπούλου', role: 'Μαμά', color: '#EC4899', email: 'maria@family.com' },
    { name: 'Πέτρος Παπαδόπουλος', role: 'Μπαμπάς', color: '#3B82F6', email: 'petros@family.com' },
    { name: 'Γιάννης Παπαδόπουλος', role: 'Γιος', color: '#8B5CF6', email: 'giannis@family.com' },
    { name: 'Σοφία Παπαδοπούλου', role: 'Κόρη', color: '#F59E0B', email: 'sofia@family.com' }
  ];

  const settings = [
    { icon: Bell, label: 'Ειδοποιήσεις', badge: 'On' },
    { icon: Users, label: 'Διαχείριση Οικογένειας' },
    { icon: Tag, label: 'Κατηγορίες & Tags' },
    { icon: Heart, label: 'Προτιμήσεις' }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 pt-6 pb-8">
        <h1 className="text-white text-2xl font-bold mb-1">Προφίλ</h1>
        <p className="text-white/80 text-sm">Οικογένεια Παπαδοπούλου</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        
        {/* Family Members */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Μέλη Οικογένειας</h2>
          <div className="space-y-3">
            {familyMembers.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <p className="text-xs text-gray-400 mt-1">{member.email}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ρυθμίσεις</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {settings.map((setting, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors ${
                  idx !== settings.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <setting.icon className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left font-medium text-gray-900">{setting.label}</span>
                {setting.badge && (
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    {setting.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Σχετικά</h3>
          <p className="text-sm text-gray-600 mb-1">Version 1.0.0</p>
          <p className="text-sm text-gray-600">FamilyHub © 2026</p>
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate('login')}
          className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Αποσύνδεση
        </button>
      </div>
    </div>
  );
}

// Bottom Navigation
function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Αρχική' },
    { id: 'calendar', icon: Calendar, label: 'Ημερολόγιο' },
    { id: 'tasks', icon: ListTodo, label: 'Tasks' },
    { id: 'shopping', icon: ShoppingBag, label: 'Αγορές' },
    { id: 'obligations', icon: School, label: 'Υποχρ.' },
    { id: 'money', icon: DollarSign, label: 'Οικον.' },
    { id: 'profile', icon: User, label: 'Προφίλ' }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 py-2 pb-4">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}