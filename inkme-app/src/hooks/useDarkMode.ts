import {Appearance} from "react-native"
import {useState, useEffect, useCallback} from "react"

/**
 * hook to make use of the systems appearence mode
 *
 * @returns {boolean} if dark mode is enabled
 */
export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => Appearance.getColorScheme() === "dark"
  )
  const listener = useCallback(
    ({colorScheme}) => setIsDarkMode(colorScheme === "dark"),
    [setIsDarkMode]
  )
  useEffect(() => {
    Appearance.addChangeListener(listener)
    return () => {
      Appearance.removeChangeListener(listener)
    }
  }, [])
  return isDarkMode
}
