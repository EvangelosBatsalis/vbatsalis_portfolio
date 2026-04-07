# React Native Paper με Expo - Complete Guide

## Περιεχόμενα
1. [Εισαγωγή](#εισαγωγή)
2. [Installation & Setup](#installation--setup)
3. [Configuration](#configuration)
4. [Βασικά Components](#βασικά-components)
5. [Theming](#theming)
6. [Navigation Integration](#navigation-integration)
7. [Best Practices](#best-practices)
8. [Παραδείγματα](#παραδείγματα)

---

## Εισαγωγή

Το **React Native Paper** είναι ένα high-quality, cross-platform Material Design component library για React Native. Προσφέρει:

- ✅ Material Design 3 components
- ✅ Full TypeScript support
- ✅ Customizable theming
- ✅ Dark mode support
- ✅ Accessibility features
- ✅ Perfect integration με Expo

---

## Installation & Setup

### 1. Δημιουργία νέου Expo project

```bash
# Δημιουργία νέου project
npx create-expo-app my-app
cd my-app

# Ή με TypeScript template
npx create-expo-app my-app --template
```

### 2. Installation του React Native Paper

```bash
# Install React Native Paper
npm install react-native-paper

# Install dependencies
npx expo install react-native-safe-area-context
```

### 3. Vector Icons Setup (προαιρετικό αλλά recommended)

```bash
npx expo install @expo/vector-icons
```

---

## Configuration

### App.js / App.tsx Basic Setup

```jsx
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainScreen from './screens/MainScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <MainScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

### Configuration με Custom Theme

```jsx
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

export default function App() {
  const colorScheme = useColorScheme();
  
  const theme = {
    ...(colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme),
    colors: {
      ...(colorScheme === 'dark' ? MD3DarkTheme.colors : MD3LightTheme.colors),
      primary: '#6200ee',
      secondary: '#03dac6',
      accent: '#f50057',
    },
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <MainScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

---

## Βασικά Components

### 1. Button

```jsx
import { Button } from 'react-native-paper';

// Contained button (default)
<Button mode="contained" onPress={() => console.log('Pressed')}>
  Click Me
</Button>

// Outlined button
<Button mode="outlined" onPress={() => console.log('Pressed')}>
  Outlined
</Button>

// Text button
<Button mode="text" onPress={() => console.log('Pressed')}>
  Text Button
</Button>

// Button με icon
<Button 
  mode="contained" 
  icon="camera"
  onPress={() => console.log('Pressed')}
>
  Take Photo
</Button>

// Loading state
<Button mode="contained" loading={true}>
  Loading
</Button>

// Disabled
<Button mode="contained" disabled>
  Disabled
</Button>
```

### 2. Text Input

```jsx
import { TextInput } from 'react-native-paper';

const [text, setText] = React.useState('');

// Outlined (default)
<TextInput
  label="Email"
  value={text}
  onChangeText={text => setText(text)}
/>

// Flat
<TextInput
  mode="flat"
  label="Password"
  value={text}
  onChangeText={text => setText(text)}
  secureTextEntry
/>

// Με icons
<TextInput
  label="Search"
  value={text}
  onChangeText={text => setText(text)}
  left={<TextInput.Icon icon="magnify" />}
  right={<TextInput.Icon icon="close" onPress={() => setText('')} />}
/>

// Με error
<TextInput
  label="Email"
  value={text}
  onChangeText={text => setText(text)}
  error={!text.includes('@')}
/>
```

### 3. Card

```jsx
import { Card, Title, Paragraph } from 'react-native-paper';

<Card>
  <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
  <Card.Title 
    title="Card Title" 
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
  />
  <Card.Content>
    <Title>Card title</Title>
    <Paragraph>Card content</Paragraph>
  </Card.Content>
  <Card.Actions>
    <Button>Cancel</Button>
    <Button>Ok</Button>
  </Card.Actions>
</Card>
```

### 4. List

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
    left={props => <List.Icon {...props} icon="calendar" />}
    right={props => <List.Icon {...props} icon="chevron-right" />}
    onPress={() => {}}
  />
</List.Section>

// Accordion
<List.Accordion
  title="Accordion"
  left={props => <List.Icon {...props} icon="folder" />}
>
  <List.Item title="First item" />
  <List.Item title="Second item" />
</List.Accordion>
```

### 5. Chip

```jsx
import { Chip } from 'react-native-paper';

<Chip icon="information" onPress={() => console.log('Pressed')}>
  Example Chip
</Chip>

// Selected
<Chip 
  selected 
  onPress={() => console.log('Pressed')}
>
  Selected
</Chip>

// Με close icon
<Chip 
  onClose={() => console.log('Closed')}
  onPress={() => console.log('Pressed')}
>
  Closeable
</Chip>
```

### 6. Dialog

```jsx
import { Dialog, Portal, Button, Paragraph } from 'react-native-paper';

const [visible, setVisible] = React.useState(false);
const showDialog = () => setVisible(true);
const hideDialog = () => setVisible(false);

<Portal>
  <Dialog visible={visible} onDismiss={hideDialog}>
    <Dialog.Title>Alert</Dialog.Title>
    <Dialog.Content>
      <Paragraph>This is a dialog</Paragraph>
    </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={hideDialog}>Cancel</Button>
      <Button onPress={hideDialog}>Ok</Button>
    </Dialog.Actions>
  </Dialog>
</Portal>

<Button onPress={showDialog}>Show Dialog</Button>
```

### 7. Snackbar

```jsx
import { Snackbar } from 'react-native-paper';

const [visible, setVisible] = React.useState(false);
const onDismissSnackBar = () => setVisible(false);

<Snackbar
  visible={visible}
  onDismiss={onDismissSnackBar}
  action={{
    label: 'Undo',
    onPress: () => {
      // Do something
    },
  }}
  duration={3000}
>
  Hey there! I'm a Snackbar.
</Snackbar>
```

### 8. FAB (Floating Action Button)

```jsx
import { FAB } from 'react-native-paper';

// Simple FAB
<FAB
  icon="plus"
  style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
  onPress={() => console.log('Pressed')}
/>

// FAB Group
<FAB.Group
  open={open}
  icon={open ? 'close' : 'plus'}
  actions={[
    { icon: 'plus', onPress: () => console.log('Pressed add') },
    { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star') },
    { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
  ]}
  onStateChange={({ open }) => setOpen(open)}
  onPress={() => {
    if (open) {
      // do something if the speed dial is open
    }
  }}
/>
```

### 9. Avatar

```jsx
import { Avatar } from 'react-native-paper';

// Image Avatar
<Avatar.Image size={48} source={{ uri: 'https://picsum.photos/200' }} />

// Icon Avatar
<Avatar.Icon size={48} icon="account" />

// Text Avatar
<Avatar.Text size={48} label="JD" />
```

### 10. AppBar

```jsx
import { Appbar } from 'react-native-paper';

<Appbar.Header>
  <Appbar.BackAction onPress={() => {}} />
  <Appbar.Content title="Title" subtitle="Subtitle" />
  <Appbar.Action icon="magnify" onPress={() => {}} />
  <Appbar.Action icon="dots-vertical" onPress={() => {}} />
</Appbar.Header>
```

---

## Theming

### Custom Theme Definition

```jsx
import { MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
  android: {
    regular: {
      fontFamily: 'Roboto',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
  },
};

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    primaryContainer: '#bb86fc',
    secondary: '#03dac6',
    secondaryContainer: '#018786',
    tertiary: '#f50057',
    error: '#b00020',
    errorContainer: '#fdecea',
    background: '#ffffff',
    surface: '#ffffff',
    surfaceVariant: '#f5f5f5',
    onPrimary: '#ffffff',
    onSecondary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#ffffff',
    outline: '#79747e',
  },
  fonts: configureFonts({ config: fontConfig }),
};

export default customTheme;
```

### Using Theme in Components

```jsx
import { useTheme } from 'react-native-paper';
import { View, Text } from 'react-native';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.primary }}>
        Themed Text
      </Text>
    </View>
  );
}
```

### Dark Mode Support

```jsx
import * as React from 'react';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

export default function App() {
  const colorScheme = useColorScheme();
  
  const theme = React.useMemo(
    () =>
      colorScheme === 'dark'
        ? {
            ...MD3DarkTheme,
            colors: {
              ...MD3DarkTheme.colors,
              primary: '#bb86fc',
              accent: '#03dac6',
            },
          }
        : {
            ...MD3LightTheme,
            colors: {
              ...MD3LightTheme.colors,
              primary: '#6200ee',
              accent: '#03dac6',
            },
          },
    [colorScheme]
  );

  return (
    <PaperProvider theme={theme}>
      {/* Your app */}
    </PaperProvider>
  );
}
```

---

## Navigation Integration

### React Navigation με React Native Paper

```bash
# Install React Navigation
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

### App.js με Navigation

```jsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  const theme = useTheme();
  
  return (
    <NavigationContainer
      theme={{
        dark: theme.dark,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.onSurface,
          border: theme.colors.outline,
          notification: theme.colors.error,
        },
      }}
    >
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerShown: false, // Use Paper's Appbar instead
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}
```

### Custom Header με Appbar

```jsx
import { Appbar } from 'react-native-paper';

function CustomNavigationBar({ navigation, back, route }) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route.name} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
}

// Στο Stack Navigator
<Stack.Navigator
  screenOptions={{
    header: (props) => <CustomNavigationBar {...props} />,
  }}
>
  {/* screens */}
</Stack.Navigator>
```

---

## Best Practices

### 1. Theme Organization

Δημιούργησε ξεχωριστό file για το theme:

```jsx
// theme.js
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',
    secondary: '#03dac6',
  },
};
```

### 2. Component Composition

Δημιούργησε reusable components:

```jsx
// components/CustomButton.js
import { Button } from 'react-native-paper';

export const PrimaryButton = ({ children, ...props }) => (
  <Button mode="contained" {...props}>
    {children}
  </Button>
);

export const SecondaryButton = ({ children, ...props }) => (
  <Button mode="outlined" {...props}>
    {children}
  </Button>
);
```

### 3. Form Validation με TextInput

```jsx
import { TextInput, HelperText } from 'react-native-paper';

const [email, setEmail] = React.useState('');

const hasErrors = () => {
  return !email.includes('@');
};

<TextInput
  label="Email"
  value={email}
  onChangeText={text => setEmail(text)}
  error={hasErrors()}
/>
<HelperText type="error" visible={hasErrors()}>
  Email address is invalid!
</HelperText>
```

### 4. Portal για Modals

Χρησιμοποίησε Portal για overlays:

```jsx
import { Portal, Modal, Button } from 'react-native-paper';

const [visible, setVisible] = React.useState(false);

<Portal>
  <Modal
    visible={visible}
    onDismiss={() => setVisible(false)}
    contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
  >
    <Text>Modal Content</Text>
  </Modal>
</Portal>
```

### 5. Accessibility

Πάντα προσθέτε accessibility props:

```jsx
<Button
  mode="contained"
  onPress={handlePress}
  accessibilityLabel="Submit form"
  accessibilityHint="Double tap to submit the form"
>
  Submit
</Button>
```

---

## Παραδείγματα

### Complete Screen Example

```jsx
import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Appbar,
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  Snackbar,
  useTheme,
} from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Title title="Welcome" subtitle="React Native Paper" />
          <Card.Content>
            <Title>Getting Started</Title>
            <Paragraph>
              This is an example of React Native Paper components.
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Details')}>
              Learn More
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setVisible(true)}
      />

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Undo',
          onPress: () => {},
        }}
      >
        Item added!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
```

### Form Example

```jsx
import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  TextInput,
  Button,
  HelperText,
  Checkbox,
  RadioButton,
  Switch,
  Text,
} from 'react-native-paper';

export default function FormScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState('first');
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const hasErrors = () => {
    return !email.includes('@');
  };

  const handleSubmit = () => {
    console.log({ email, password, checked, value, isSwitchOn });
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        error={hasErrors()}
        style={styles.input}
      />
      <HelperText type="error" visible={hasErrors()}>
        Email address is invalid!
      </HelperText>

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        style={styles.input}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
        />
        <Text>I agree to terms and conditions</Text>
      </View>

      <RadioButton.Group onValueChange={setValue} value={value}>
        <View style={styles.radioContainer}>
          <RadioButton value="first" />
          <Text>First option</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="second" />
          <Text>Second option</Text>
        </View>
      </RadioButton.Group>

      <View style={styles.switchContainer}>
        <Text>Enable notifications</Text>
        <Switch
          value={isSwitchOn}
          onValueChange={setIsSwitchOn}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={hasErrors() || !email || !password}
      >
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    marginTop: 16,
  },
});
```

### List με Search Example

```jsx
import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Searchbar,
  List,
  Divider,
  Avatar,
} from 'react-native-paper';

const DATA = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

export default function ListScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expanded, setExpanded] = React.useState(true);

  const filteredData = DATA.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <ScrollView>
        <List.Section>
          <List.Accordion
            title="Contacts"
            left={props => <List.Icon {...props} icon="account-group" />}
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
          >
            {filteredData.map((item, index) => (
              <React.Fragment key={item.id}>
                <List.Item
                  title={item.name}
                  description={item.email}
                  left={props => (
                    <Avatar.Text
                      {...props}
                      label={item.name.substring(0, 2).toUpperCase()}
                    />
                  )}
                  right={props => <List.Icon {...props} icon="chevron-right" />}
                  onPress={() => console.log(item.name)}
                />
                {index < filteredData.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    margin: 16,
  },
});
```

---

## Χρήσιμα Links

- **Documentation**: https://callstack.github.io/react-native-paper/
- **Component Showcase**: https://callstack.github.io/react-native-paper/showcase.html
- **Icons**: https://pictogrammers.com/library/mdi/
- **Expo**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/

---

## Tips & Tricks

1. **Performance**: Χρησιμοποίησε `React.memo()` για components που δεν αλλάζουν συχνά
2. **Icons**: Το Paper χρησιμοποιεί Material Community Icons by default
3. **TypeScript**: Το Paper έχει excellent TypeScript support
4. **Testing**: Χρησιμοποίησε React Native Testing Library
5. **Customization**: Όλα τα components μπορούν να customized με style prop
6. **Accessibility**: Το Paper έχει built-in accessibility features
7. **Dark Mode**: Automatic support με το system theme

---

**Happy Coding! 🚀**
