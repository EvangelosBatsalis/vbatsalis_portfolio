# React Native Cheat Sheet - Πλήρης Οδηγός

## 📑 Index

1. [Βασικά Components](#1-βασικά-components)
   - View, Text, Image, ScrollView
2. [Input Components](#2-input-components)
   - TextInput, Button, Pressable, TouchableOpacity
3. [Lists](#3-lists)
   - FlatList, SectionList
4. [Layout με Flexbox](#4-layout-με-flexbox)
   - Flex, Direction, Align, Justify
5. [Styling](#5-styling)
   - StyleSheet, Inline styles, Dimensions
6. [Navigation Basics](#6-navigation-basics)
   - Stack, Tab, Drawer
7. [Hooks](#7-hooks)
   - useState, useEffect, useCallback
8. [React Native Paper Components](#8-react-native-paper-components)
   - TextInput, Button, Card, και άλλα
9. [Tips & Tricks](#9-tips--tricks)

---

## 1. Βασικά Components

### View - Το Container

```jsx
import { View } from 'react-native';

// Απλό View
<View style={{ padding: 20 }}>
  <Text>Περιεχόμενο</Text>
</View>

// View με πολλά styles
<View style={styles.container}>
  <Text>Κεντραρισμένο</Text>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
```

**Χρήσιμα Props:**
- `style`: Styles
- `onLayout`: Callback όταν αλλάζει το layout

---

### Text - Κείμενο

```jsx
import { Text } from 'react-native';

// Βασικό
<Text>Hello World</Text>

// Με styling
<Text style={{ fontSize: 20, color: 'blue' }}>
  Μπλε κείμενο
</Text>

// Πολλαπλά Text components
<Text>
  Αυτό είναι <Text style={{ fontWeight: 'bold' }}>bold</Text> κείμενο
</Text>

// Με onPress
<Text onPress={() => alert('Clicked!')}>
  Πάτησέ με
</Text>
```

**Χρήσιμα Props:**
- `numberOfLines`: Περιορίζει τις γραμμές
- `ellipsizeMode`: 'tail', 'head', 'middle', 'clip'
- `onPress`: Callback για click
- `selectable`: Αν μπορεί να επιλεγεί το κείμενο

```jsx
// Με ellipsis
<Text numberOfLines={2} ellipsizeMode="tail">
  Πολύ μεγάλο κείμενο που θα κοπεί...
</Text>
```

---

### Image - Εικόνες

```jsx
import { Image } from 'react-native';

// Local Image
<Image 
  source={require('./assets/logo.png')}
  style={{ width: 100, height: 100 }}
/>

// Remote Image
<Image 
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
/>

// Με resizeMode
<Image 
  source={require('./assets/photo.jpg')}
  style={{ width: '100%', height: 200 }}
  resizeMode="cover"
/>
```

**resizeMode options:**
- `cover`: Γεμίζει το container (crop αν χρειάζεται)
- `contain`: Χωράει ολόκληρη η εικόνα
- `stretch`: Τεντώνει την εικόνα
- `center`: Κεντράρει χωρίς scale

```jsx
// ImageBackground (εικόνα ως background)
import { ImageBackground } from 'react-native';

<ImageBackground 
  source={require('./assets/bg.jpg')}
  style={{ flex: 1 }}
>
  <Text>Κείμενο πάνω στην εικόνα</Text>
</ImageBackground>
```

---

### ScrollView - Scrollable Content

```jsx
import { ScrollView } from 'react-native';

// Vertical scroll (default)
<ScrollView>
  <Text>Πολύ περιεχόμενο...</Text>
  <Text>Πολύ περιεχόμενο...</Text>
  <Text>Πολύ περιεχόμενο...</Text>
</ScrollView>

// Horizontal scroll
<ScrollView horizontal>
  <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
  <View style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
  <View style={{ width: 100, height: 100, backgroundColor: 'green' }} />
</ScrollView>

// Με styling
<ScrollView 
  style={{ flex: 1 }}
  contentContainerStyle={{ padding: 20 }}
  showsVerticalScrollIndicator={false}
>
  <Text>Content</Text>
</ScrollView>
```

**Χρήσιμα Props:**
- `horizontal`: Οριζόντιο scroll
- `showsVerticalScrollIndicator`: Εμφανίζει scrollbar
- `contentContainerStyle`: Style για το περιεχόμενο
- `bounces`: iOS bounce effect (default: true)

---

### SafeAreaView - Ασφαλής Περιοχή

```jsx
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
  <View style={{ flex: 1 }}>
    {/* Το content δεν θα κρυφτεί από το notch */}
  </View>
</SafeAreaView>
```

**Εγκατάσταση:**
```bash
npx expo install react-native-safe-area-context
```

**Σημείωση:** Το `SafeAreaView` από το `react-native` είναι deprecated. Χρησιμοποίησε πάντα το package `react-native-safe-area-context`.

**Πότε να το χρησιμοποιείς:**
- Πάντα στο root του screen
- Ειδικά για iOS devices με notch
- Σε combination με StatusBar

---

## 2. Input Components

### TextInput - Πεδίο Εισαγωγής

```jsx
import { TextInput } from 'react-native';
import { useState } from 'react';

function MyComponent() {
  const [text, setText] = useState('');
  
  return (
    <TextInput
      style={styles.input}
      value={text}
      onChangeText={setText}
      placeholder="Γράψε κάτι..."
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  }
});
```

**Χρήσιμα Props:**
```jsx
<TextInput
  // Text props
  value={text}
  onChangeText={setText}
  placeholder="Email"
  placeholderTextColor="#999"
  
  // Keyboard types
  keyboardType="email-address"  // 'default', 'numeric', 'phone-pad'
  autoCapitalize="none"          // 'none', 'sentences', 'words', 'characters'
  autoCorrect={false}
  
  // Security
  secureTextEntry={true}         // Για passwords
  
  // Multiline
  multiline={true}
  numberOfLines={4}
  
  // Focus
  autoFocus={true}
  onFocus={() => console.log('focused')}
  onBlur={() => console.log('blurred')}
  
  // Style
  style={styles.input}
/>
```

**Password Input παράδειγμα:**
```jsx
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <TextInput
    style={{ flex: 1 }}
    value={password}
    onChangeText={setPassword}
    secureTextEntry={!showPassword}
    placeholder="Password"
  />
  <Pressable onPress={() => setShowPassword(!showPassword)}>
    <Text>{showPassword ? '🙈' : '👁️'}</Text>
  </Pressable>
</View>
```

---

### Button - Κουμπί

```jsx
import { Button } from 'react-native';

// Βασικό button
<Button 
  title="Πάτησέ με"
  onPress={() => alert('Pressed!')}
/>

// Με χρώμα
<Button 
  title="Login"
  onPress={handleLogin}
  color="#007AFF"
/>

// Disabled
<Button 
  title="Submit"
  onPress={handleSubmit}
  disabled={!isValid}
/>
```

**Προσοχή:** Το native Button έχει περιορισμένα styling options. Χρησιμοποίησε Pressable για custom buttons.

---

### Pressable - Custom Clickable

```jsx
import { Pressable, Text } from 'react-native';

// Βασικό
<Pressable onPress={() => console.log('pressed')}>
  <Text>Click me</Text>
</Pressable>

// Με hover/press effects
<Pressable 
  onPress={handlePress}
  style={({ pressed }) => [
    styles.button,
    { opacity: pressed ? 0.7 : 1 }
  ]}
>
  <Text>Custom Button</Text>
</Pressable>

// Full custom button
<Pressable
  onPress={handlePress}
  style={styles.button}
  android_ripple={{ color: '#ddd' }}
>
  <Text style={styles.buttonText}>Sign Up</Text>
</Pressable>

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});
```

---

### TouchableOpacity - Με Fade Effect

```jsx
import { TouchableOpacity, Text } from 'react-native';

<TouchableOpacity 
  onPress={handlePress}
  activeOpacity={0.7}
  style={styles.button}
>
  <Text>Click me</Text>
</TouchableOpacity>
```

---

## 3. Lists

### FlatList - Optimized List

```jsx
import { FlatList, Text } from 'react-native';

const data = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
];

<FlatList
  data={data}
  keyExtractor={item => item.id}
  renderItem={({ item }) => (
    <Text>{item.name}</Text>
  )}
/>
```

**Με styling και extras:**
```jsx
<FlatList
  data={data}
  keyExtractor={item => item.id}
  renderItem={({ item, index }) => (
    <View style={styles.item}>
      <Text>{index + 1}. {item.name}</Text>
    </View>
  )}
  
  // Separators
  ItemSeparatorComponent={() => (
    <View style={{ height: 1, backgroundColor: '#ddd' }} />
  )}
  
  // Empty state
  ListEmptyComponent={() => (
    <Text>Δεν υπάρχουν items</Text>
  )}
  
  // Header & Footer
  ListHeaderComponent={() => <Text>Header</Text>}
  ListFooterComponent={() => <Text>Footer</Text>}
  
  // Performance
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
  
  // Pull to refresh
  refreshing={refreshing}
  onRefresh={handleRefresh}
  
  // Load more
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
/>
```

**Horizontal FlatList:**
```jsx
<FlatList
  data={data}
  horizontal
  showsHorizontalScrollIndicator={false}
  renderItem={({ item }) => (
    <View style={{ width: 100, height: 100, margin: 8 }}>
      <Text>{item.name}</Text>
    </View>
  )}
/>
```

---

### SectionList - Grouped List

```jsx
import { SectionList } from 'react-native';

const sections = [
  {
    title: 'Φρούτα',
    data: ['Μήλο', 'Μπανάνα', 'Πορτοκάλι']
  },
  {
    title: 'Λαχανικά',
    data: ['Ντομάτα', 'Αγγούρι']
  }
];

<SectionList
  sections={sections}
  keyExtractor={(item, index) => item + index}
  renderItem={({ item }) => (
    <Text style={styles.item}>{item}</Text>
  )}
  renderSectionHeader={({ section: { title } }) => (
    <Text style={styles.header}>{title}</Text>
  )}
/>
```

---

## 4. Layout με Flexbox

### Flex Basics

```jsx
// Container παίρνει όλο το χώρο
<View style={{ flex: 1 }}>
  <Text>Content</Text>
</View>

// Μοιράζουμε το χώρο
<View style={{ flex: 1 }}>
  <View style={{ flex: 1, backgroundColor: 'red' }} />
  <View style={{ flex: 2, backgroundColor: 'blue' }} />  // Διπλάσιο χώρο
  <View style={{ flex: 1, backgroundColor: 'green' }} />
</View>
```

---

### FlexDirection

```jsx
// Column (default) - κάθετα
<View style={{ flexDirection: 'column' }}>
  <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
</View>

// Row - οριζόντια
<View style={{ flexDirection: 'row' }}>
  <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
</View>

// Row-reverse - αντίστροφα
<View style={{ flexDirection: 'row-reverse' }}>
  <Text>1</Text>
  <Text>2</Text>
  <Text>3</Text>
</View>
```

---

### JustifyContent - Main Axis

```jsx
// flex-start (default)
<View style={{ flex: 1, justifyContent: 'flex-start' }}>
  <View style={styles.box} />
</View>

// center
<View style={{ flex: 1, justifyContent: 'center' }}>
  <View style={styles.box} />
</View>

// flex-end
<View style={{ flex: 1, justifyContent: 'flex-end' }}>
  <View style={styles.box} />
</View>

// space-between
<View style={{ flex: 1, justifyContent: 'space-between' }}>
  <View style={styles.box} />
  <View style={styles.box} />
  <View style={styles.box} />
</View>

// space-around
<View style={{ flex: 1, justifyContent: 'space-around' }}>
  <View style={styles.box} />
  <View style={styles.box} />
</View>

// space-evenly
<View style={{ flex: 1, justifyContent: 'space-evenly' }}>
  <View style={styles.box} />
  <View style={styles.box} />
</View>
```

---

### AlignItems - Cross Axis

```jsx
// stretch (default)
<View style={{ flex: 1, alignItems: 'stretch' }}>
  <View style={{ height: 50, backgroundColor: 'red' }} />
</View>

// center
<View style={{ flex: 1, alignItems: 'center' }}>
  <View style={{ width: 100, height: 50, backgroundColor: 'red' }} />
</View>

// flex-start (αριστερά)
<View style={{ flex: 1, alignItems: 'flex-start' }}>
  <View style={styles.box} />
</View>

// flex-end (δεξιά)
<View style={{ flex: 1, alignItems: 'flex-end' }}>
  <View style={styles.box} />
</View>
```

---

### Κεντράρισμα (Horizontal & Vertical)

```jsx
<View style={{
  flex: 1,
  justifyContent: 'center',  // Κεντράρει κάθετα
  alignItems: 'center',       // Κεντράρει οριζόντια
}}>
  <Text>Κεντραρισμένο!</Text>
</View>
```

---

### Κοινά Layouts

**Header + Content + Footer:**
```jsx
<View style={{ flex: 1 }}>
  <View style={{ height: 60, backgroundColor: '#007AFF' }}>
    <Text>Header</Text>
  </View>
  
  <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <Text>Main Content</Text>
  </View>
  
  <View style={{ height: 60, backgroundColor: '#ddd' }}>
    <Text>Footer</Text>
  </View>
</View>
```

**Sidebar + Content:**
```jsx
<View style={{ flex: 1, flexDirection: 'row' }}>
  <View style={{ width: 200, backgroundColor: '#333' }}>
    <Text>Sidebar</Text>
  </View>
  
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <Text>Main Content</Text>
  </View>
</View>
```

---

## 5. Styling

### StyleSheet.create

```jsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  }
});

// Χρήση
<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
</View>
```

---

### Inline Styles

```jsx
// Απλό
<View style={{ padding: 20, backgroundColor: 'red' }}>

// Πολλαπλά styles (array)
<View style={[styles.container, { marginTop: 20 }]}>

// Conditional styles
<View style={[
  styles.button,
  isActive && styles.activeButton,
  isDisabled && { opacity: 0.5 }
]}>
```

---

### Dimensions - Screen Size

```jsx
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

<View style={{ width: width * 0.8, height: height * 0.5 }}>

// Με useWindowDimensions (hook - better for rotation)
import { useWindowDimensions } from 'react-native';

function MyComponent() {
  const { width, height } = useWindowDimensions();
  
  return (
    <View style={{ width: width * 0.9 }}>
      <Text>Responsive!</Text>
    </View>
  );
}
```

---

### Platform-Specific Styles

```jsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 4,
      }
    })
  }
});
```

---

### Shadows

**iOS:**
```jsx
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
}
```

**Android:**
```jsx
{
  elevation: 5,
}
```

**Universal (function):**
```jsx
const shadow = (elevation) => ({
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation },
      shadowOpacity: 0.2,
      shadowRadius: elevation,
    },
    android: {
      elevation,
    }
  })
});

// Use
<View style={[styles.card, shadow(4)]}>
```

---

## 6. Navigation Basics

### Stack Navigator

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Navigate
function HomeScreen({ navigation }) {
  return (
    <Button 
      title="Go to Details"
      onPress={() => navigation.navigate('Details', { userId: 123 })}
    />
  );
}

// Get params
function DetailsScreen({ route, navigation }) {
  const { userId } = route.params;
  
  return (
    <View>
      <Text>User ID: {userId}</Text>
      <Button 
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
```

---

### Tab Navigator

```jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

---

## 7. Hooks

### useState

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>{count}</Text>
      <Button 
        title="Increase"
        onPress={() => setCount(count + 1)}
      />
      <Button 
        title="Reset"
        onPress={() => setCount(0)}
      />
    </View>
  );
}

// Object state
const [user, setUser] = useState({ name: '', age: 0 });

// Update
setUser({ ...user, name: 'John' });

// Array state
const [items, setItems] = useState([]);

// Add item
setItems([...items, newItem]);

// Remove item
setItems(items.filter(item => item.id !== idToRemove));
```

---

### useEffect

```jsx
import { useEffect } from 'react';

// Run once (on mount)
useEffect(() => {
  console.log('Component mounted');
  
  // Cleanup
  return () => {
    console.log('Component unmounted');
  };
}, []);

// Run when dependency changes
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);

// Fetch data example
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    setData(data);
  };
  
  fetchData();
}, []);
```

---

### useCallback

```jsx
import { useCallback } from 'react';

// Memoize function
const handlePress = useCallback(() => {
  console.log('Pressed!');
}, []);

// With dependency
const handleUpdate = useCallback(() => {
  updateItem(itemId);
}, [itemId]);
```

---

## 8. React Native Paper Components

### Setup

```bash
npm install react-native-paper
```

```jsx
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      {/* Your app */}
    </PaperProvider>
  );
}
```

---

### Paper TextInput

```jsx
import { TextInput } from 'react-native-paper';

<TextInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  mode="outlined"  // 'flat' or 'outlined'
  keyboardType="email-address"
  left={<TextInput.Icon icon="email" />}
  right={<TextInput.Icon icon="eye" />}
/>

// With error
<TextInput
  label="Password"
  value={password}
  onChangeText={setPassword}
  mode="outlined"
  secureTextEntry
  error={!!errorMessage}
/>
{errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
```

---

### Paper Button

```jsx
import { Button } from 'react-native-paper';

// Text button
<Button onPress={handlePress}>
  Press me
</Button>

// Contained button
<Button mode="contained" onPress={handlePress}>
  Submit
</Button>

// Outlined button
<Button mode="outlined" onPress={handlePress}>
  Cancel
</Button>

// With icon
<Button 
  mode="contained" 
  icon="camera"
  onPress={handlePress}
>
  Take Photo
</Button>

// Custom style
<Button 
  mode="contained"
  onPress={handlePress}
  style={{ marginTop: 16 }}
  contentStyle={{ paddingVertical: 8 }}
  labelStyle={{ fontSize: 18 }}
>
  Login
</Button>
```

---

### Paper Card

```jsx
import { Card, Button } from 'react-native-paper';

<Card>
  <Card.Cover source={{ uri: 'https://example.com/image.jpg' }} />
  <Card.Title 
    title="Card Title" 
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
  />
  <Card.Content>
    <Text>Card content</Text>
  </Card.Content>
  <Card.Actions>
    <Button>Cancel</Button>
    <Button>Ok</Button>
  </Card.Actions>
</Card>
```

---

### Paper List

```jsx
import { List } from 'react-native-paper';

<List.Section>
  <List.Subheader>Some title</List.Subheader>
  <List.Item
    title="First Item"
    description="Item description"
    left={props => <List.Icon {...props} icon="folder" />}
    onPress={() => {}}
  />
  <List.Item
    title="Second Item"
    description="Item description"
    left={props => <List.Icon {...props} icon="folder" />}
    right={props => <List.Icon {...props} icon="chevron-right" />}
    onPress={() => {}}
  />
</List.Section>

// Accordion
<List.Accordion
  title="Expandable"
  left={props => <List.Icon {...props} icon="folder" />}
>
  <List.Item title="First item" />
  <List.Item title="Second item" />
</List.Accordion>
```

---

### Paper Dialog

```jsx
import { Dialog, Portal, Button } from 'react-native-paper';

const [visible, setVisible] = useState(false);

<Portal>
  <Dialog visible={visible} onDismiss={() => setVisible(false)}>
    <Dialog.Title>Alert</Dialog.Title>
    <Dialog.Content>
      <Text>This is a dialog</Text>
    </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={() => setVisible(false)}>Cancel</Button>
      <Button onPress={() => setVisible(false)}>Ok</Button>
    </Dialog.Actions>
  </Dialog>
</Portal>

<Button onPress={() => setVisible(true)}>Show Dialog</Button>
```

---

### Paper FAB

```jsx
import { FAB } from 'react-native-paper';

<FAB
  icon="plus"
  style={styles.fab}
  onPress={() => console.log('Pressed')}
/>

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

// FAB Group
<FAB.Group
  open={open}
  icon={open ? 'close' : 'plus'}
  actions={[
    { icon: 'plus', onPress: () => console.log('Pressed add') },
    { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star')},
    { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
  ]}
  onStateChange={({ open }) => setOpen(open)}
/>
```

---

## 9. Tips & Tricks

### Keyboard Avoiding

```jsx
import { KeyboardAvoidingView, Platform } from 'react-native';

<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}
>
  <TextInput placeholder="Email" />
  <TextInput placeholder="Password" />
</KeyboardAvoidingView>
```

---

### Status Bar

```jsx
import { StatusBar } from 'react-native';

<StatusBar 
  barStyle="dark-content"  // 'light-content' or 'dark-content'
  backgroundColor="#fff"    // Android only
/>
```

---

### Loading Indicator

```jsx
import { ActivityIndicator } from 'react-native';

{loading && (
  <ActivityIndicator size="large" color="#0000ff" />
)}

// Centered
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <ActivityIndicator size="large" />
</View>
```

---

### Modal

```jsx
import { Modal } from 'react-native';

const [modalVisible, setModalVisible] = useState(false);

<Modal
  animationType="slide"  // 'slide', 'fade', 'none'
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text>Hello World!</Text>
      <Button 
        title="Close"
        onPress={() => setModalVisible(false)}
      />
    </View>
  </View>
</Modal>
```

---

### RefreshControl (Pull to Refresh)

```jsx
import { ScrollView, RefreshControl } from 'react-native';

const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  // Fetch data
  await fetchData();
  setRefreshing(false);
};

<ScrollView
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
>
  <Text>Pull to refresh</Text>
</ScrollView>
```

---

### Animated Values

```jsx
import { Animated } from 'react-native';

const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();
}, []);

<Animated.View style={{ opacity: fadeAnim }}>
  <Text>Fading in</Text>
</Animated.View>
```

---

### Linking (Open URLs)

```jsx
import { Linking } from 'react-native';

// Open URL
Linking.openURL('https://google.com');

// Open phone
Linking.openURL('tel:+1234567890');

// Open email
Linking.openURL('mailto:support@example.com');

// Open maps
Linking.openURL('geo:37.78,122.4');
```

---

### Alert

```jsx
import { Alert } from 'react-native';

// Simple alert
Alert.alert('Title', 'Message');

// With buttons
Alert.alert(
  'Confirm',
  'Are you sure?',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', onPress: () => console.log('OK Pressed') }
  ]
);
```

---

**🎉 Τέλος! Αυτό το cheat sheet καλύπτει τα πιο σημαντικά React Native components και patterns.**
