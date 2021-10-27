/* eslint-disable react/jsx-no-bind */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';

export function CustomModal() {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function handleSubmit() {
    alert('VAI SALVAR');
    setIsOpen(false);
  }

  return (
    <>
      <Button
        leftIcon={<Icon as={AiOutlinePlus} />}
        bg="green.800"
        ml="8"
        _hover={{ bg: 'green.700' }}
        variant="solid"
        onClick={onOpen}
      >
        Novo
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova informação</ModalHeader>

          <ModalBody>
            <Box as="form" onSubmit={handleSubmit}>
              <VStack spacing="6">
                <FormControl id="users">
                  <FormLabel>Usuários</FormLabel>
                  <Select placeholder="Selecione um usuário">
                    <option>Daniel</option>
                    <option>Leandro</option>
                  </Select>
                </FormControl>

                <FormControl id="date">
                  <FormLabel>Data</FormLabel>
                  <Input placeholder="Selecione uma data" type="date" />
                </FormControl>

                <FormControl id="weight">
                  <FormLabel>Peso</FormLabel>
                  <NumberInput
                    precision={2}
                    max={999}
                    min={1}
                    placeholder="Informe o peso"
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl id="height">
                  <FormLabel>Altura</FormLabel>
                  <NumberInput
                    precision={2}
                    max={9}
                    min={1}
                    placeholder="Informe a altura"
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" variant="ghost" mr="4" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              bg="green.600"
              _hover={{ bg: 'green.500' }}
              mr={3}
              onClick={handleSubmit}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
