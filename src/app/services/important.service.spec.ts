import { of, take, toArray } from 'rxjs';
import { ImportantService } from './important.service';
import { TestScheduler } from 'rxjs/testing';

describe('ImportantService', () => {
  let subject: ImportantService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    subject = new ImportantService();
  });

  it('should instantiate', () => {
    expect(subject).toBeDefined();
  });

  it('should verify value from number$ observable', (done) => {
    subject.number$.subscribe((num) => {
      expect(num).toBe(42);
      done();
    });
  });

  it('should verify values from numbers$ observable', (done) => {
    subject.numbers$.subscribe((num) => {
      // tests for ANY emitted number
      expect(num).toBe(1);
      done();
    });
  });

  it('should verify all values from numbers$ observable', (done) => {
    subject.numbers$.pipe(toArray()).subscribe((nums) => {
      expect(nums).toEqual([1, 2, 3, 4, 5]);
      done();
    });
  });

  it.skip('should slowly ;) verify values from numbersForever$ observable', (done) => {
    subject.numbersForever$.pipe(take(4), toArray()).subscribe((num) => {
      // very slow, actually waits for the interval
      expect(num).toEqual([0, 1, 2, 3]);
      done();
    });
  });

  describe('with rxjs TestScheduler', () => {
    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) =>
        expect(actual).toEqual(expected)
      );
    });

    it('should verify values from number$ observable with marbles', () => {
      testScheduler.run(({ expectObservable }) => {
        expectObservable(subject.number$).toBe('(a|)', { a: 42 });
      });
    });

    it('should verify values from number$ observable with Observable to compare', () => {
      testScheduler.run(({ expectObservable }) => {
        expectObservable(subject.number$).toEqual(of(42));
      });
    });

    it('should verify all values from numbers$ observable', () => {
      testScheduler.run(({ expectObservable }) => {
        expectObservable(subject.numbers$).toBe('(abcde|)', {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
          e: 5,
        });
      });
    });

    it('should verify values from numbersForever$ observable', () => {
      testScheduler.run(({ expectObservable }) => {
        expectObservable(subject.numbersForever$.pipe(take(4))).toBe(
          '1000ms a 999ms b 999ms c 999ms (d|)',
          { a: 0, b: 1, c: 2, d: 3 }
        );
      });
    });
  });
});
