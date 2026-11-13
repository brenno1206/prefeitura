import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
//import { colors, fontSize, fontWeight, radius, spacing } from '../../theme'

export default function EventCard({ event, onPress }) {

    const ocurrence = event.ocurrences[0]

    return (

        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.8}
            accessibilityRole="button"
        >
            <View style={styles.iconBox}>
                <Ionicons name="calendar" size={25} color={colors.primary} />
            </View>

            <View style={styles.info}>
                <Text style={styles.category}>CULTURA</Text>
                
                <Text style={styles.title}>
                    {event.title}
                </Text>

                <View style={styles.detail}>
                    <Ionicons name="time" size={14} color={colors.textMuted} />

                    <Text style={styles.detailText}>
                        {ocurrence?.dateDescription || 'Data não informada.'}
                    </Text>
                </View>

                <View style={styles.detail}>
                    <Ionicons name="location" size={14} color={colors.textMuted} />

                    <Text style={styles.detailText}>
                        {ocurrence?.place || 'Local não informado'}
                    </Text>
                </View>
            </View>

            <Ionicons />

        </TouchableOpacity>
    )
}