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

            <Ionicons
                name="seta-dir"
                size={19}
                color={colors.textPlaceholder}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md
    },

    iconBox: {
        width: 48,
        height: 48,
        borderRadius: radius.lg,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center'
    },

    info: {
        flex: 1,
        gap: spacing.xs
    },

    category: {
        fontSize: fontSize.xss,
        color: colors.primary,
        fontWeight: fontWeight.bold
    },

    title: {
        fontSize: fontSize.md,
        color: colors.textPrimary,
        fontWeight: fontWeight.bold
    },

    detail: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs
    },

    detailText: {
        flex: 1,
        fontSize: fontSize.xs,
        color: colors.textMuted
    }
})