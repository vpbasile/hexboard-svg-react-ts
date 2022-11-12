// Top-level App for selecting a specific Gameboard to display
import { useState } from 'react';

//style
import './css/bootstrap.css';
import './css/color-dark.css';

// <> Import components
import ErrorBoundary from './components/ErrorBoundary';

// <> Import GameBoards
import Generative from './boards/Generative';
import TriviaBoard from './boards/TriviaBoard';
import Keyboard from './boards/Keyboard';
import SavedBoard from './boards/SavedBoard';
import CreateBoard from './boards/CreateBoard';

import { AppShell, Header, Text, MediaQuery, Burger, useMantineTheme, Image, Group, ButtonVariant } from '@mantine/core';

export default function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  // <> Global constants for choosing a game
  const options = [
    { key: 'trivia', title: 'Trivia Board', value: 'trivia', GameBoard: <TriviaBoard /> },
    { key: 'keyboard', title: 'Keyboard', value: 'keyboard', GameBoard: <Keyboard /> },
    { key: 'saved', title: 'Saved Map', value: 'saved', GameBoard: <SavedBoard /> },
    { key: 'generative', title: 'Generative Map', value: 'generative', GameBoard: <Generative /> },
    { key: 'create', title: 'Create Board', value: 'create', GameBoard: <CreateBoard /> },
  ]
  const [chosenGameBoard, setGame] = useState(options[0])

  function pickGameBoard(pickedKey: string) {
    const choice = options.find((thisOption) => { return (thisOption.key === pickedKey) })
    if (choice) setGame(choice)
  }

  let boardSelectOptions: any[] = [];
  let buttonID = 0;
  const navBar = options.map(option => {
    boardSelectOptions.push({ value: option.key, label: option.title })
    let variant: ButtonVariant;
    if (chosenGameBoard.key === option.key) { variant = 'light' } else { variant = 'subtle' }
    return (
      <hr/>
      // <Button variant={variant} color='green' key={buttonID++} onClick={() => pickGameBoard(option.key)}>
      //   {option.title}
      // </Button>
    )
  })

  // Remove this
  const selectionOptionsOLD = boardSelectOptions.map((eachOption) => { return (<option value={eachOption.value}>{eachOption.label}</option>) });

  // const gameSelectRef = useEventListener('change',)

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      // footer={
      //   <Footer height={60} p="md">
      //     Canvas Width: <NumberInput defaultValue={canvasWidth} />
      //   </Footer>
      // }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />

            </MediaQuery>
            <Group>
              {/* This was originally an H1 */}
              {/* <h1>Hexboard Maker</h1> */}
              <Image src='../public/logo-blue.png' alt='Hexboard Maker' />
              <Text>Choose a gameboard</Text>
              <select onChange={(e) => { if (e) { pickGameBoard(e.target.value) } }}>
                {selectionOptionsOLD}
              </select>
            </Group>
          </div>
        </Header>
      }
    >
      <ErrorBoundary>
        {chosenGameBoard.GameBoard}
      </ErrorBoundary>
    </AppShell>
  );

}