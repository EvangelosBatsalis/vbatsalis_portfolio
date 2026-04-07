# Tutorial 1: Εξήγηση Login Screen με React Native Paper

## Τι φτιάξαμε

Ένα απλό login screen με:
- Logo εικόνα στην κορυφή
- Τίτλο "Famify"
- Slogan κάτω από τον τίτλο
- SafeAreaView για ασφαλή προβολή σε όλες τις συσκευές

---

## Ανάλυση Κώδικα

### 1. Imports

```jsx
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
```

**Τι κάνουν:**
- `React`: Το βασικό library
- `View`: Container component (σαν div στο HTML)
- `StyleSheet`: Για να γράφουμε CSS-like styles
- `Image`: Για εικόνες
- `SafeAreaView`: Κρατάει το content μακριά από notches/status bars (από react-native-safe-area-context)
- `Text` από Paper: Styled text component με Material Design

**Σημείωση:** Το SafeAreaView από το `react-native` είναι deprecated. Χρησιμοποιούμε το `react-native-safe-area-context`:
```bash
npx expo install react-native-safe-area-context
```

---

### 2. SafeAreaView (Outer Container)

```jsx
<SafeAreaView style={styles.safeArea}>
  ...
</SafeAreaView>
```

**Γιατί το χρειαζόμαστε:**
- Στα iPhone με notch (π.χ. iPhone X+), το content μπορεί να κρυφτεί
- Στα Android, το status bar μπορεί να επικαλύψει το content
- Το SafeAreaView αποφεύγει αυτά τα προβλήματα

**Style:**
```jsx
safeArea: {
  flex: 1,              // Παίρνει όλο το διαθέσιμο χώρο
  backgroundColor: '#fff',  // Λευκό background
}
```

---

### 3. View (Inner Container)

```jsx
<View style={styles.container}>
  ...
</View>
```

**Ρόλος:**
- Είναι το κύριο container για το περιεχόμενο
- Κεντράρει όλα τα στοιχεία

**Style:**
```jsx
container: {
  flex: 1,                    // Παίρνει όλο το χώρο
  alignItems: 'center',       // Κεντράρει οριζόντια
  justifyContent: 'center',   // Κεντράρει κάθετα
  padding: 20,                // Αποστάσεις από τα άκρα
}
```

---

### 4. Image Component

```jsx
<Image
  source={require('./assets/logo.png')}
  style={styles.logo}
/>
```

**Πώς λειτουργεί:**
- `source={require(...)}`: Φορτώνει local εικόνα
- Για remote εικόνες: `source={{uri: 'https://...'}}

**Style:**
```jsx
logo: {
  width: 100,
  height: 100,
  marginBottom: 20,  // Απόσταση από το επόμενο στοιχείο
}
```

---

### 5. Text Components (React Native Paper)

#### Τίτλος
```jsx
<Text variant="headlineLarge" style={styles.title}>
  Famify
</Text>
```

**Variants στο Paper:**
- `displayLarge`, `displayMedium`, `displaySmall`
- `headlineLarge`, `headlineMedium`, `headlineSmall`
- `titleLarge`, `titleMedium`, `titleSmall`
- `bodyLarge`, `bodyMedium`, `bodySmall`
- `labelLarge`, `labelMedium`, `labelSmall`

#### Slogan
```jsx
<Text variant="bodyMedium" style={styles.slogan}>
  Η οικογένειά σου, πάντα κοντά σου
</Text>
```

**Styles:**
```jsx
title: {
  fontWeight: 'bold',
  marginBottom: 8,
},
slogan: {
  color: '#666',           // Γκρι χρώμα
  marginBottom: 30,        // Μεγάλη απόσταση για το επόμενο section
  textAlign: 'center',     // Κεντραρισμένο κείμενο
}
```

---

## Flexbox Concepts που χρησιμοποιήσαμε

### flex: 1
- Το component παίρνει όλο το διαθέσιμο χώρο
- Αν έχεις 2 components με `flex: 1`, μοιράζονται 50-50

### alignItems vs justifyContent
- **alignItems**: Οριζόντια στοίχιση (cross-axis)
  - `center`, `flex-start`, `flex-end`, `stretch`
- **justifyContent**: Κάθετη στοίχιση (main-axis)
  - `center`, `flex-start`, `flex-end`, `space-between`, `space-around`

---

## Επόμενα Βήματα

1. Προσθήκη TextInput για email
2. Προσθήκη TextInput για password
3. Προσθήκη Button για login
4. Προσθήκη "Forgot Password" link

---

## Tips

- Χρησιμοποίησε `marginBottom` για αποστάσεις μεταξύ στοιχείων
- Το `padding` στο container δίνει αέρα στα άκρα
- Δοκίμασε διαφορετικά `variant` για να δεις ποιο σου αρέσει
- Για custom fonts, θα χρειαστεί expo-font

