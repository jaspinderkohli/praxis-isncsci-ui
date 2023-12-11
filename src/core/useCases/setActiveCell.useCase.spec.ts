import {beforeEach, describe, expect, it} from '@jest/globals';
import {setActiveCellUseCase} from './setActiveCell.useCase';
import {IIsncsciAppStoreProvider} from '@core/boundaries';
import {Cell} from '@core/domain';
import {bindExamDataToGridModel} from '@core/helpers';
import {getAppStoreProviderMock} from '@testHelpers/appStoreProviderMocks';
import {getEmptyExamData} from '@core/helpers/examData.helper';

const getEmptyCell = (name: string): Cell => {
  return {
    value: '',
    label: '',
    reasonImpairmentNotDueToSci: undefined,
    reasonImpairmentNotDueToSciSpecify: undefined,
    name,
  };
};

describe('setActiveCell.useCase.ts', () => {
  describe('setActiveCellUseCase', () => {
    let appStoreProvider: IIsncsciAppStoreProvider;
    let gridModel: Array<Cell | null>[] = [];

    beforeEach(() => {
      gridModel = bindExamDataToGridModel(getEmptyExamData());
      appStoreProvider = getAppStoreProviderMock();
    });

    it('should set the cell matching `cellName` as active cell and only selected cell when `cellName` is not null and selection mode is `single`', async () => {
      // Arrange
      const cellName = 'right-light-touch-c5';
      const cell = getEmptyCell(cellName);
      const currentActiveCell: Cell | null = null;
      const selectionMode = 'single';
      const currentCellsSelected: Cell[] = [
        getEmptyCell('right-light-touch-c2'),
      ];

      // Act
      await setActiveCellUseCase(
        cellName,
        currentActiveCell,
        selectionMode,
        currentCellsSelected,
        gridModel,
        appStoreProvider,
      );

      // Assert
      expect(appStoreProvider.setActiveCell).toHaveBeenCalledWith(cell);
      expect(appStoreProvider.setSelectedCells).toHaveBeenCalledWith([cell]);
    });

    it('should set `null` as active cell and empty array as selected cells when `cellName` is `null` and selection mode is `single`', async () => {
      // Arrange
      const cellName: string | null = null;
      const currentActiveCell: Cell | null = null;
      const selectionMode = 'single';
      const currentCellsSelected: Cell[] = [
        getEmptyCell('right-light-touch-c2'),
      ];

      // Act
      await setActiveCellUseCase(
        cellName,
        currentActiveCell,
        selectionMode,
        currentCellsSelected,
        gridModel,
        appStoreProvider,
      );

      // Assert
      expect(appStoreProvider.setActiveCell).toHaveBeenCalledWith(null);
      expect(appStoreProvider.setSelectedCells).toHaveBeenCalledWith([]);
    });

    it('should throw an exception when `cellName` is not valid', async () => {
      // Arrange
      const cellName = 'invalid-cell-name';
      const currentActiveCell: Cell | null = null;
      const selectionMode = 'single';
      const currentCellsSelected: Cell[] = [
        getEmptyCell('right-light-touch-c2'),
      ];
      let errorMessage = '';

      // Act
      try {
        await setActiveCellUseCase(
          cellName,
          currentActiveCell,
          selectionMode,
          currentCellsSelected,
          gridModel,
          appStoreProvider,
        );
      } catch (error) {
        errorMessage = (error as Error).message;
      }

      // Assert
      expect(errorMessage).toBe(`Invalid cell name ${cellName}`);
    });

    it('should throw an exception when `cellName` is not valid', async () => {
      // Arrange
      const cellName = 'left-motor-c2';
      const currentActiveCell: Cell | null = null;
      const selectionMode = 'single';
      const currentCellsSelected: Cell[] = [
        getEmptyCell('right-light-touch-c2'),
      ];
      let errorMessage = '';

      // Act
      try {
        await setActiveCellUseCase(
          cellName,
          currentActiveCell,
          selectionMode,
          currentCellsSelected,
          gridModel,
          appStoreProvider,
        );
      } catch (error) {
        errorMessage = (error as Error).message;
      }

      // Assert
      expect(errorMessage).toBe(`Cell ${cellName} not found`);
    });

    it('should leave things as they are when `cellName` is null and selection mode is `multiple`', async () => {
      // Arrange
      const cellName: string | null = null;
      const currentActiveCell: Cell | null = null;
      const selectionMode = 'multiple';
      const currentCellsSelected: Cell[] = [
        getEmptyCell('right-light-touch-c2'),
        getEmptyCell('right-motor-t1'),
      ];

      // Act
      await setActiveCellUseCase(
        cellName,
        currentActiveCell,
        selectionMode,
        currentCellsSelected,
        gridModel,
        appStoreProvider,
      );

      // Assert
      expect(appStoreProvider.setActiveCell).not.toHaveBeenCalled();
      expect(appStoreProvider.setSelectedCells).not.toHaveBeenCalled();
    });

    it('should leave things as they are when `cellName` is null and selection mode is `range`', async () => {
      // Arrange
      const cellName: string | null = null;
      const currentActiveCell: Cell | null = null;
      const selectionMode = 'range';
      const currentCellsSelected: Cell[] = [
        getEmptyCell('right-light-touch-c2'),
        getEmptyCell('right-motor-t1'),
      ];

      // Act
      await setActiveCellUseCase(
        cellName,
        currentActiveCell,
        selectionMode,
        currentCellsSelected,
        gridModel,
        appStoreProvider,
      );

      // Assert
      expect(appStoreProvider.setActiveCell).not.toHaveBeenCalled();
      expect(appStoreProvider.setSelectedCells).not.toHaveBeenCalled();
    });

    it('should set the cell matching `cellName` as active cell and remove `cell` from the cell selection when `cellName` is not null, selection mode is multiple, and `cell` is already included in the cell selection', async () => {
      // Arrange
      const cellName = 'right-light-touch-c5';
      const cell = getEmptyCell(cellName);
      const currentActiveCell: Cell | null = null;
      const selectionMode = 'multiple';
      const currentCellsSelected: Cell[] = [
        getEmptyCell('right-light-touch-c2'),
        getEmptyCell(cellName),
        getEmptyCell('right-motor-t1'),
      ];

      // Act
      await setActiveCellUseCase(
        cellName,
        currentActiveCell,
        selectionMode,
        currentCellsSelected,
        gridModel,
        appStoreProvider,
      );

      // Assert
      expect(appStoreProvider.setActiveCell).toHaveBeenCalledWith(cell);
      expect(appStoreProvider.setSelectedCells).toHaveBeenCalledWith(
        currentCellsSelected.slice(1, 1),
      );
    });

    it('should set the cell matching `cellName` as active cell and add `cell` to the current selection when `cellName` is not null and selection mode is `multiple`', async () => {
      // Arrange
      const cellName = 'right-light-touch-c5';
      const cell = getEmptyCell(cellName);
      const currentActiveCell: Cell | null = null;
      const selectionMode = 'multiple';
      const currentCellsSelected: Cell[] = [
        getEmptyCell('right-light-touch-c2'),
        getEmptyCell('right-motor-t1'),
      ];

      // Act
      await setActiveCellUseCase(
        cellName,
        currentActiveCell,
        selectionMode,
        currentCellsSelected,
        gridModel,
        appStoreProvider,
      );

      // Assert
      expect(appStoreProvider.setActiveCell).toHaveBeenCalledWith(cell);
      expect(appStoreProvider.setSelectedCells).toHaveBeenCalledWith([
        ...currentCellsSelected,
        cell,
      ]);
    });

    /*
     *  5.1. If there is no current active cell, stop, we cannot produce a range to add to the existing selection.
     *  5.2. Produce a new aggregated selection without duplicates between the range and the existing selection.
     *  5.3. Set the new selection.
     */

    it('should set the cell matching `cellName` as active cell but leave the current cell selection as is when `cellName` is not `null` but the current active cell is `null` and selection mode is `range`', async () => {
      // Arrange
      const cellName = 'right-light-touch-c5';
      const cell = getEmptyCell(cellName);
      const currentActiveCell: Cell | null = null;
      const selectionMode = 'range';
      const currentCellsSelected: Cell[] = [
        getEmptyCell('right-light-touch-c2'),
        getEmptyCell('right-motor-t1'),
      ];

      // Act
      await setActiveCellUseCase(
        cellName,
        currentActiveCell,
        selectionMode,
        currentCellsSelected,
        gridModel,
        appStoreProvider,
      );

      // Assert
      expect(appStoreProvider.setActiveCell).toHaveBeenCalledWith(cell);
      expect(appStoreProvider.setSelectedCells).not.toHaveBeenCalled();
    });

    it('should set the cell matching `cellName` as active cell and add the range between `cell` and `currentCellSelected`, without any duplicates, when `cellName` and `currentSelectedCell` are not `null` and `selectionMode` is `range`', async () => {
      // Arrange
      const cellName = 'left-motor-c5';
      const cell = getEmptyCell(cellName);
      const currentActiveCell = getEmptyCell('left-motor-t1');
      const selectionMode = 'range';
      const currentCellsSelected: Cell[] = [
        getEmptyCell('right-light-touch-c2'),
        getEmptyCell('right-motor-t1'),
      ];
      const expectedSelection: Cell[] = [
        ...currentCellsSelected,
        getEmptyCell('left-motor-c5'),
        getEmptyCell('left-motor-c6'),
        getEmptyCell('left-motor-c7'),
        getEmptyCell('left-motor-c8'),
        getEmptyCell('left-motor-t1'),
      ];

      // Act
      await setActiveCellUseCase(
        cellName,
        currentActiveCell,
        selectionMode,
        currentCellsSelected,
        gridModel,
        appStoreProvider,
      );

      // Assert
      expect(appStoreProvider.setActiveCell).toHaveBeenCalledWith(cell);
      expect(appStoreProvider.setSelectedCells).toHaveBeenCalledWith(
        expectedSelection,
      );
    });
  });
});