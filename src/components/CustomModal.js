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
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { useUsers } from '../hooks/users';
import api from '../services/api';

export function CustomModal() {
  const { users } = useUsers();
  const [isOpen, setIsOpen] = useState(false);
  const todayDate = new Date();
  const todayDateString = `${todayDate.getUTCFullYear()}-${String(
    todayDate.getUTCMonth() + 1,
  ).padStart(2, '0')}-${String(todayDate.getUTCDate()).padStart(2, '0')}`;

  const initialValues = {
    date: todayDateString,
    height: '',
    user: '',
    weight: '',
  };

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: initialValues,
  });

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  async function handleCreate(values) {
    const date = values.date.split('-').reverse().join('/');
    const weight = Number(values.weight);
    let height = 0;

    if (!values.height) {
      const res = await api.get(`/infos/${values.user}/all`);

      height = res.data[0].height;
    } else {
      height = Number(values.height);
    }

    try {
      await api.post('/infos', {
        date,
        height,
        user: values.user,
        weight,
      });
      reset(initialValues);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsOpen(false);
    }
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
        <ModalContent bg="gray.700">
          <ModalHeader>Nova informação</ModalHeader>

          <ModalBody>
            <Box as="form" onSubmit={handleSubmit(handleCreate)}>
              <VStack spacing="6">
                <FormControl id="users">
                  <FormLabel>Usuários</FormLabel>
                  <Select
                    placeholder="Selecione um usuário"
                    {...register('user')}
                    name="user"
                  >
                    {users.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl id="date">
                  <FormLabel>Data</FormLabel>
                  <Input
                    placeholder="Selecione uma data"
                    type="date"
                    {...register('date')}
                    name="date"
                  />
                </FormControl>

                <FormControl id="weight">
                  <FormLabel>Peso</FormLabel>
                  <NumberInput precision={2} max={999} min={1}>
                    <NumberInputField
                      placeholder="Informe o peso"
                      {...register('weight')}
                      name="weight"
                    />
                  </NumberInput>
                </FormControl>

                <FormControl id="height">
                  <FormLabel>Altura</FormLabel>
                  <NumberInput precision={3} max={9} min={0}>
                    <NumberInputField
                      placeholder="Informe a altura"
                      {...register('height')}
                      name="height"
                    />
                  </NumberInput>
                </FormControl>
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              variant="ghost"
              mr="4"
              onClick={onClose}
              disabled={formState.isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              bg="green.600"
              _hover={{ bg: 'green.500' }}
              mr={3}
              onClick={handleSubmit(handleCreate)}
              isLoading={formState.isSubmitting}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
